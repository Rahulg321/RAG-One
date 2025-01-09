'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
                ? 'h-16 bg-muted/70 backdrop-blur-md shadow-md'
                : 'h-20 bg-muted'
                }`}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <h1 className={`font-bold transition-all duration-300 ease-in-out ${isScrolled ? 'text-xl' : 'text-3xl'
                            }`}>
                            Logo
                        </h1>
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-gray-200">Home</Link>
                        <Link href="/about" className="text-gray-600 dark:text-muted-foreground dark:hover:text-gray-200 hover:text-gray-900">About</Link>
                        <Link href="/services" className="text-gray-600 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-gray-200">Services</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-gray-200">Contact</Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="hidden md:inline-flex">
                        Sign In
                    </Button>
                    <Button className="hidden md:inline-flex">
                        Sign Up
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
