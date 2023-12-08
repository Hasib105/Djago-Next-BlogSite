"use client";

import Postcard from "@/components/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";

export default function Home() {
    const { posts, loading, error } = usePosts();

    return (
        <div className="h-full p-8">
            <h1 className="text-4xl font-black pt-2 pb-6 capitalize">All Posts</h1>
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
                    <p className="text-destructive">
                        Could not load categories!
                    </p>
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
