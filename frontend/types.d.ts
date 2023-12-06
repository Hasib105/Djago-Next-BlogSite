export interface Category {
    id: number;
    name: string;
    posts: Post[];
    slug: string;
}

export interface Post {
    category: number;
    content: string;
    id: number;
    image: string;
    published_date: Date;
    slug: string;
    title: string;
}
