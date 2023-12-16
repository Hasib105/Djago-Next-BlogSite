import Postcard from "@/components/post-card";
import { Category } from "@/types";
import { getData } from "@/lib/get-data";

export default async function CategoryPosts({
    params,
}: {
    params: { id: number };
}) {
    const category: Category = await getData(`/categories/${params.id}`);
    return (
        <div className="h-full py-8 px-20">
            <h1 className="text-4xl font-black pt-2 pb-6 capitalize">
                Posts in {category.name}
            </h1>
            <div className="grid grid-cols-4 gap-6 h-full">
                {category.posts &&
                    category.posts.map((post) => (
                        <Postcard
                            key={post.id}
                            post={post}
                        />
                    ))}
            </div>
        </div>
    );
}
