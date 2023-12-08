import {
    Biohazard,
    ChevronRight,
    Home,
    Library,
    Newspaper,
    PlaySquare,
    Search,
    ShoppingBag,
    Star,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SidebarMainMenu({
    onNavigate,
}: {
    onNavigate: (menu: string) => void;
}) {
    return (
        <div className="h-full">
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
                    <Link href="/">
                        <Button
                            variant="secondary"
                            className="w-full justify-start">
                            <Home className="mr-3 h-4 w-4" />
                            Home
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start">
                        <Search className="mr-3 h-4 w-4" />
                        Search
                    </Button>
                    <Link href="/posts">
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Library className="mr-3 h-4 w-4" />
                            All Posts
                        </Button>
                    </Link>
                    <Button
                        onClick={() => onNavigate("categories")}
                        variant="ghost"
                        className="w-full justify-between flex">
                        <div className="flex">
                            <Star className="mr-3 h-4 w-4" />
                            Categories
                        </div>
                        <ChevronRight className="h-5 w-5" />
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
        </div>
    );
}
