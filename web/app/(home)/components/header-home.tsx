'use client'
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import { usePathname } from "next/navigation"
import { ModeToggle } from '@/components/theme-toggle'

const HeaderHomeComponent = () => {
    const pathname = usePathname()
    return (
        <>
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-6 md:px-8 lg:px-10 sticky top-0 z-10  border-b border-foreground/10 transition-colors hover:text-foreground/80">
                <div className="lg:container mx-auto flex items-center justify-between">
                    <Link className="text-xl font-bold " href="#">
                        My Blog
                    </Link>
                    <div className="flex items-center">
                        <nav className="hidden md:flex space-x-4">
                            <Link
                                href="/"
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === "/blog" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/"
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                About
                            </Link>
                            <Link
                                href="/"
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Contact
                            </Link>
                        </nav>
                        <div className=" px-2 flex justify-center items-center gap-2">
                            <Link href="/auth">
                                <Button variant="default" size="sm">Login</Button>
                            </Link>
                            <ModeToggle />
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="ml-auto md:hidden" size="icon" variant="ghost">
                                    <MenuIcon className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div className="grid gap-4 px-4 py-6">
                                    <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                        <HomeIcon className="h-5 w-5" />
                                        Home
                                    </Link>
                                    <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                        <PodcastIcon className="h-5 w-5" />
                                        Blog
                                    </Link>
                                    <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                        <InfoIcon className="h-5 w-5" />
                                        About
                                    </Link>
                                    <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                        <ContactIcon className="h-5 w-5" />
                                        Contact
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderHomeComponent

function ContactIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <circle cx="12" cy="10" r="2" />
            <line x1="8" x2="8" y1="2" y2="4" />
            <line x1="16" x2="16" y1="2" y2="4" />
        </svg>
    )
}


function HomeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function InfoIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}


function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function PodcastIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
            <path d="M8 14a5 5 0 1 1 8 0" />
            <circle cx="12" cy="11" r="1" />
            <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z" />
        </svg>
    )
}