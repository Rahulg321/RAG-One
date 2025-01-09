import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create a new account',
}

export default function SignUpPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500">Create your account to get started</p>
            </div>
            <form action="#" className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="m@example.com" required type="email" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" required type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" required type="password" />
                </div>
                <Button className="w-full" type="submit">
                    Sign Up
                </Button>
            </form>
            <div className="text-center text-sm">
                Already have an account?{' '}
                <Link className="underline" href="/login">
                    Login
                </Link>
            </div>
        </div>
    )
}
