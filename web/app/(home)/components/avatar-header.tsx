import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Link from 'next/link'

const AvatarHeader = async () => {
    const session: any | null = await getServerSession(authOptions);
    // console.log(session);
    const isLoggedIn = session !== null; // Define the isLoggedIn variable
    return (
        <>
            {isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>{session.user.data.name}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{session.user.data.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard">
                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                        </Link>


                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/auth">
                    <Button variant="default" size="sm">Login</Button>
                </Link>
            )}


        </>
    )
}

export default AvatarHeader