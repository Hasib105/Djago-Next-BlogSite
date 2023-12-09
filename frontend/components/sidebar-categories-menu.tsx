import { ChevronLeft, Star } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useFetch } from "@/hooks/use-fetch";
import { Category } from "@/types";

interface Props {
    onNavigate: (menu: string) => void;
}

export default function SidebarCategoriesMenu({ onNavigate }: Props) {
    const {
        data: categories,
        loading,
        error,
    } = useFetch<Category>("/categories");

    return (
        <div className="h-full">
            {/* Sidebar header section */}
            <div className="py-6 px-4 flex items-center justify-between">
                <Button
                    onClick={() => onNavigate("main")}
                    variant="ghost"
                    className="w-full justify-start text-md font-semibold">
                    <ChevronLeft
                        strokeWidth={3}
                        className="mr-2 h-5 w-5"
                    />
                    Home
                </Button>
            </div>

            {/* Sidebar menu section */}
            <h1 className="flex px-6 pb-4 items-center text-lg font-bold tracking-tight">
                Categories
            </h1>
            <ScrollArea className="h-full">
                <div className="space-y-1 px-6">
                    {loading &&
                        Array(8)
                            .fill(1)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-6 w-full pr-4"
                                />
                            ))}

                    {error && (
                        <p className="text-destructive">
                            Could not load categories!
                        </p>
                    )}
                    {categories &&
                        categories.map((category) => (
                            <Button
                                key={category.id}
                                variant="ghost"
                                className="w-full justify-start">
                                <Star className="mr-3 h-4 w-4" />
                                {category.name}
                            </Button>
                        ))}
                </div>
            </ScrollArea>
        </div>
    );
}
