"use client";

import { useFetch } from "@/hooks/use-fetch";
import { Category, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Post({ params }: { params: { id: number } }) {
    const {
        data: post,
        loading,
        error,
    } = useFetch<Post>("/posts/" + params.id);

    const {
        data: category,
        loading: categoryLoading,
        error: categoryError,
    } = useFetch<Category>("/categories/" + post?.category);

    return (
        <div className="h-full py-8 px-20">
            <div className="border-b border-border">
                <div className="font-bold uppercase text-xs cursor-pointer">
                    Category:
                    <Link
                        href="#"
                        className="ml-2">
                        {category?.name}
                    </Link>
                </div>
                <h1 className="text-5xl font-black py-4">{post?.title}</h1>
                <Image
                    className="w-full rounded-md mt-2"
                    alt={post?.title as string}
                    height={600}
                    width={900}
                    src={
                        post?.image ? post.image : "/images/static/no-image.png"
                    }
                />
                <p className="py-4 font-bold uppercase text-xs">
                    Published:{" "}
                    {new Date(post?.published_date).toLocaleDateString()}
                </p>
            </div>
            <p className="pt-6">{post?.content}</p>
        </div>
    );
}
