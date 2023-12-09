"use client";

import Postcard from "@/components/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/use-fetch";
import { Post } from "@/types";

export default function AllPosts() {
    const { data: posts, loading, error } = useFetch<Post[]>("/posts");

    return (
        <div className="h-full py-8 px-20">
            <h1 className="text-4xl font-black pt-2 pb-6 capitalize">
                All Posts
            </h1>
            <div className="grid grid-cols-4 gap-4 h-full">
                {loading &&
                    Array(12)
                        .fill(1)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-[200px] w-full"
                            />
                        ))}

                {error && (
                    <p className="text-destructive">Could not load posts!</p>
                )}

                {posts &&
                    posts.map((post) => (
                        <Postcard
                            key={post.id}
                            post={post}
                        />
                    ))}
            </div>
        </div>
    );
}
