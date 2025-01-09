import React from "react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import LoginBackground from "@/public/auth/Background.avif";
import Head from "next/head";
import ThemeSwitchButton from "@/components/theme-switch-button";
import localFont from "next/font/local";


const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});



const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
                        <div className="relative hidden md:block">
                            <Image
                                src={"https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt="blue background wavy for authentication pages"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-background dark:text-gray-100">
                            <ThemeSwitchButton />
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
            <GoogleAnalytics gaId="G-TTB31XWF1N" />
        </html>
    );
};

export default RootLayout;
