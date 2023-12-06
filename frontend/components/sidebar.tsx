"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidebarMainMenu from "./sidebar-main-menu";
import SidebarCategoriesMenu from "./sidebar-categories-menu";
import { useState } from "react";

export function Sidebar({ className }: { className?: string }) {
    const [menu, setMenu] = useState("main");

    const navigateTo = (menu: string) => {
        setMenu(menu);
    };

    const renderMenu = () => {
        switch (menu) {
            case "main":
                return <SidebarMainMenu onNavigate={navigateTo} />;
            case "categories":
                return <SidebarCategoriesMenu onNavigate={navigateTo} />;
            default:
                return null;
        }
    };

    return (
        <div className={cn("relative h-screen", className)}>
            {/* Sidebar dynamic menu section */}
            {renderMenu()}

            {/* Sidebar footer section */}
            <div className="gap-2 py-6 px-4 bottom-0 absolute bg-background border-t w-full flex justify-around">
                <Button
                    className="w-full border-2"
                    variant="outline">
                    Login
                </Button>
                <Button className="w-full">Register</Button>
            </div>
        </div>
    );
}
