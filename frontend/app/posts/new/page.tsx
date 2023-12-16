"use client";

import { useFetch } from "@/hooks/use-fetch";
import { Category, Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postFormSchema, PostFormSchema } from "./post-form-schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { AutofitTextarea } from "@/components/autofit-texarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Post() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<PostFormSchema>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            category: "",
            title: "",
            image: undefined,
            content: "",
        },
    });

    const {
        data: categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useFetch<Category[]>("/categories");

    const image = form.watch("image");
    const imagePreview = image ? URL.createObjectURL(image) : null;

    // Revoke object URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleSubmit = async (values: PostFormSchema) => {
        try {
            const formData = new FormData();
            formData.append("category", values.category);
            formData.append("title", values.title);
            formData.append("content", values.content);
            if (values.image) {
                formData.append("image", values.image);
            }

            const response = await fetch(
                process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Could not create the post.",
                    description: `The server responded with a status of ${response.status}.`,
                });
            }

            if (response.status === 201) {
                const newPost: Post = await response.json();

                router.push(`/posts/${newPost.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form
                encType="multipart/form-data"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="h-full py-8 px-20 space-y-6">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <div className="flex items-center font-bold uppercase text-xs cursor-pointer">
                                    <span className="mr-2">Category:</span>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-48">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-background">
                                            {categoriesLoading && (
                                                <div className="pl-6">
                                                    {Array(6)
                                                        .fill(1)
                                                        .map((_, index) => (
                                                            <Skeleton
                                                                key={index}
                                                                className={`h-4 my-2 ${
                                                                    index %
                                                                        2 ===
                                                                    0
                                                                        ? "w-[50%]"
                                                                        : "w-[70%]"
                                                                }`}
                                                            />
                                                        ))}
                                                </div>
                                            )}

                                            {categoriesError && (
                                                <p className="text-destructive m-4">
                                                    Could not load categories!
                                                </p>
                                            )}
                                            {categories &&
                                                categories.map((category) => (
                                                    <SelectItem
                                                        value={category.id.toString()}
                                                        key={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="text-5xl font-black py-8"
                                        placeholder="Post title"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel
                                    htmlFor="image"
                                    className="cursor-pointer group">
                                    {imagePreview && (
                                        <Image
                                            className="w-full rounded-md aspect-[3/2] object-cover group-hover:opacity-90"
                                            alt="Image preview"
                                            height={600}
                                            width={900}
                                            src={imagePreview}
                                        />
                                    )}
                                    {!imagePreview && (
                                        <div className="h-48 w-full border border-border rounded-md flex items-center justify-center group-hover:border-2">
                                            <ImagePlus className="text-text opacity-25 group-hover:opacity-40 h-12 w-12" />
                                        </div>
                                    )}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="image"
                                        {...field}
                                        className="hidden"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg, image/webp"
                                        value={""}
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <AutofitTextarea
                                        {...field}
                                        className="text-base"
                                        placeholder="Post body"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button
                    type="submit"
                    size="lg">
                    Publish
                </Button>
            </form>
        </Form>
    );
}
