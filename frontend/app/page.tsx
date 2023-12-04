import Image from "next/image";

export interface Post {
    category: number;
    content: string;
    image: string;
    id: number;
    published_date: Date;
    title: string;
}

export default async function Home() {
    const response = await fetch("http://127.0.0.1:8000/blog/posts/");
    const posts: Post[] = await response.json();

    return (
        <>
            <h1 className="text-3xl p-4">All Posts</h1>
            <div>
                {posts.map((post) => (
                    <div className="p-4" key={post.id}>
                        <Image width={200} height={200} src={post.image} alt={post.title} />
                        <h2 className="text-2xl">{post.title}</h2>
                        <p className="">{post.content}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
