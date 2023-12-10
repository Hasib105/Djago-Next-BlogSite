"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
            <h2 className="text-destructive text-2xl font-bold">
                Something went wrong!
            </h2>
            <Button
                variant="outline"
                onClick={() => reset()}
                size="lg"
                className="capitalize font-bold">
                Try again
            </Button>
        </div>
    );
}
