import { Category, Post } from "@/types";
import { getData } from "@/lib/get-data";
import Image from "next/image";
import Link from "next/link";

export default async function Post({ params }: { params: { id: number } }) {
    const post: Post = await getData("/posts/" + params.id);
    const category: Category = await getData("/categories/" + post.category);

    return (
        <div className="h-full py-8 px-20">
            <div className="font-bold uppercase text-xs cursor-pointer">
                Category:
                <Link
                    href="#"
                    className="ml-2">
                    {category.name}
                </Link>
            </div>
            <h1 className="text-5xl font-black py-4">{post.title}</h1>
            <Image
                className="w-full rounded-md mt-2"
                alt={post.title}
                height={600}
                width={900}
                src={post.image ? post.image : "/images/static/no-image.png"}
            />
            <p className="py-4 font-bold uppercase text-xs">
                Published: {new Date(post.published_date).toLocaleDateString()}
            </p>
            <p className="border-t border-border pt-6">{post.content}</p>
        </div>
    );
}
