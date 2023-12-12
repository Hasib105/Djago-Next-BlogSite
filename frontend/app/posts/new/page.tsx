"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/use-fetch";
import { Category } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Post() {
    const {
        data: categories,
        loading,
        error,
    } = useFetch<Category[]>("/categories");

    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | undefined>();

    // Create a preview image as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // Free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const expandTextarea = () => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <form className="h-full py-8 px-20">
            <div className="flex items-center font-bold uppercase text-xs cursor-pointer">
                <span className="mr-2">Category:</span>
                <Select>
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
                className="text-5xl font-black py-8 my-4"
                placeholder="Post title"
            />
            {selectedFile && (
                <Image
                    className="w-full rounded-md my-2"
                    alt="Image preview"
                    height={600}
                    width={900}
                    src={preview as string}
                />
            )}
            <Input
                className="cursor-pointer"
                type="file"
                onChange={onSelectFile}
            />
            <p className="py-4 font-bold uppercase text-xs border-b border-border">
                Status: <span className="text-destructive">Draft</span>
            </p>
            <Textarea
                ref={textareaRef}
                placeholder="Post body"
                className="mt-6"
                onInput={expandTextarea}
            />
        </form>
    );
}
