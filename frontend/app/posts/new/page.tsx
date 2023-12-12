"use client";

import { AutofitTextarea } from "@/components/autofit-texarea";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import { Category } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Post() {
    const {
        data: categories,
        loading,
        error,
    } = useFetch<Category[]>("/categories");

    return (
        <form
            encType="multipart/form-data"
            action={process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/"}
            method="POST"
            className="h-full py-8 px-20">
            <div className="flex items-center font-bold uppercase text-xs cursor-pointer">
                <span className="mr-2">Category:</span>
                <Select name="category">
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
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

            <Input
                name="title"
                className="text-5xl font-black py-8 my-4"
                placeholder="Post title"
            />

            <ImageUpload name="image" />

            <p className="py-4 font-bold uppercase text-xs border-b border-border">
                Status: <span className="text-destructive">Draft</span>
            </p>

            <AutofitTextarea
                name="content"
                className="my-4"
                placeholder="Post body"
            />

            <Button
                type="submit"
                size="lg">
                Publish
            </Button>
        </form>
    );
}
