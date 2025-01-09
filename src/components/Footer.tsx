import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitchButton from './theme-switch-button'

export default function Footer() {
    return (
        <footer className="bg-muted text-white py-12 text-muted-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            We are a company dedicated to providing excellent services and products to our customers.
                        </p>
                        <ThemeSwitchButton />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className=" transition-colors">Home</Link></li>
                            <li><Link href="/about" className=" transition-colors">About</Link></li>
                            <li><Link href="/services" className=" transition-colors">Services</Link></li>
                            <li><Link href="/contact" className=" transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><Link href="/services/web-design" className=" transition-colors">Web Design</Link></li>
                            <li><Link href="/services/development" className=" transition-colors">Development</Link></li>
                            <li><Link href="/services/marketing" className=" transition-colors">Marketing</Link></li>
                            <li><Link href="/services/consulting" className=" transition-colors">Consulting</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className=" transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-400">&copy; 2023 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
