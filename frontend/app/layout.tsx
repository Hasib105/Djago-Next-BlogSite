import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Blog",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <div className="grid lg:grid-cols-6 h-screen object-contain overflow-hidden">
                        <Sidebar className="hidden lg:block" />
                        <div className="col-span-4 lg:col-span-5 lg:border-l h-screen relative">
                            <ScrollArea className="h-full">
                                {children}
                            </ScrollArea>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
