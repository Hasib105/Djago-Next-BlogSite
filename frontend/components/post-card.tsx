import { Post } from "@/types";
import { Card, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Postcard({ post }: { post: Post }) {
    return (
        <Card className="max-w-[300px] border-none group bg-background">
            <Link href={`/posts/${post.id}`}>
                <Image
                    height={200}
                    width={300}
                    className="rounded-lg group-hover:opacity-90 transition-all duration-300"
                    src={
                        post.image ? post.image : "/images/static/no-image.png"
                    }
                    alt={post.title}
                />
            </Link>
            <Link href={`/posts/${post.id}`}>
                <CardTitle className="leading-none pt-1 text-md group-hover:underline transition-all duration-300">
                    {post.title}
                </CardTitle>
            </Link>
        </Card>
    );
}
