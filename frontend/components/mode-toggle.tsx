"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            className={className}
            variant="outline"
            size="icon"
            onClick={toggleTheme}>
            {theme === "light" ? (
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
            ) : (
                <Moon className="h-5 w-5 rotate-0 scale-100 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
