
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { ModeToggle } from '@/components/theme-toggle'
import AvatarHeader from './avatar-header'
import { MenuHome } from './menu-header'
import { MenuIcon } from 'lucide-react'

const HeaderHomeComponent = () => {
    return (
        <>
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-6 md:px-8 lg:px-10 sticky top-0 z-10  border-b border-foreground/10 transition-colors hover:text-foreground/80">
                <div className="lg:container mx-auto flex items-center justify-between">
                    <Link className="text-xl font-bold " href="#">
                        My Blog
                    </Link>
                    <div className="flex items-center">
                        <nav className="hidden md:flex space-x-4">
                            <MenuHome />
                        </nav>
                        <div className=" px-2 flex justify-center items-center gap-2">
                            <AvatarHeader />
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
                                    <MenuHome />
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

