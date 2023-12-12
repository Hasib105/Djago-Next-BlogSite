"use client";

import { AutofitTextarea } from "@/components/autofit-texarea";
import { ImageUpload } from "@/components/image-upload";
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
            <ImageUpload />
            <p className="py-4 font-bold uppercase text-xs border-b border-border">
                Status: <span className="text-destructive">Draft</span>
            </p>
            <AutofitTextarea className="mt-6"/>
        </form>
    );
}
