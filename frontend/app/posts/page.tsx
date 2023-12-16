import Postcard from "@/components/post-card";
import { Post } from "@/types";
import { getData } from "@/lib/get-data";

export default async function AllPosts() {
    const posts: Post[] = await getData("/posts");
    return (
        <div className="h-full py-8 px-20">
            <h1 className="text-4xl font-black pt-2 pb-6 capitalize">
                All Posts
            </h1>
            <div className="grid grid-cols-4 gap-6 h-full">
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
