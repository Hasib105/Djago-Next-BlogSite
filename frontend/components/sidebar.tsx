import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Biohazard,
    Home,
    Search,
    Star,
    Newspaper,
    ShoppingBag,
    PlaySquare,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Sidebar({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <main className="relative h-screen">
                {/* Sidebar header section */}
                <div className="py-6 px-4 flex items-center justify-between">
                    <h1 className="flex items-center text-2xl font-bold tracking-tight uppercase">
                        <Biohazard
                            strokeWidth={3}
                            className="mr-2 h-6 w-6"
                        />
                        Blog
                    </h1>

                    <ModeToggle className="h-8 w-8" />
                </div>

                {/* Sidebar menu section */}
                <ScrollArea className="h-full">
                    <div className="space-y-1 px-4">
                        <Button
                            variant="secondary"
                            className="w-full justify-start">
                            <Home className="mr-3 h-4 w-4" />
                            Home
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Search className="mr-3 h-4 w-4" />
                            Search
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Star className="mr-3 h-4 w-4" />
                            Reviews
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Newspaper className="mr-3 h-4 w-4" />
                            News
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <ShoppingBag className="mr-3 h-4 w-4" />
                            Store
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <PlaySquare className="mr-3 h-4 w-4" />
                            Videos
                        </Button>
                    </div>
                </ScrollArea>

                {/* Sidebar footer section */}
                <div className="gap-2 py-6 px-4 bottom-0 absolute bg-background border-t w-full flex justify-around">
                    <Button
                        className="w-full"
                        variant="outline">
                        Login
                    </Button>
                </div>
            </main>
        </div>
    );
}
