import { useState, useEffect } from "react";

export function useFetch<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + endpoint)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [endpoint]);

    return { data, loading, error };
}
