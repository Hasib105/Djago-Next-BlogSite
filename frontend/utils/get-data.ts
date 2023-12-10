export async function getData(
    endpoint: string,
    init: RequestInit = { cache: "no-store" }
) {
    const response = await fetch(process.env.BACKEND_URL + endpoint, init);

    if (!response.ok) {
        throw new Error("Failed to fetch data!");
    }

    return response.json();
}
