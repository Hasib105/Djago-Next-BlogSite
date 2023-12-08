export default function Post({ params }: { params: { id: number } }) {
    return <div>Post: {params.id}</div>;
}
