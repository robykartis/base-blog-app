'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
export function MenuHome() {
    const pathname = usePathname()
    return (
        <>
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
                href="/about"
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/about" ? "text-foreground" : "text-foreground/60"
                )}
            >
                About
            </Link>
            <Link
                href="/contact"
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/contact" ? "text-foreground" : "text-foreground/60"
                )}
            >
                Contact
            </Link>
        </>
    )
}