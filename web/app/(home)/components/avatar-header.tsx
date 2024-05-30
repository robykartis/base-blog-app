'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DETAIL_USER_URL, IMAGE_URL } from '@/lib/ApiURL'
import { ReloadIcon } from '@radix-ui/react-icons'
import useSWR from 'swr';
import axios from '@/lib/axios'

const AvatarHeader = ({ data_token, isLoggedIn }: any) => {
    async function fetcher(url: string) {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${data_token}`,
            },
        });
        return response.data;
    }

    const { data, mutate, error } = useSWR(`${DETAIL_USER_URL}${isLoggedIn}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    if (error) return (
        <div>
            <Link href="/auth">
                <Button variant="default" size="sm">Login</Button>
            </Link>
        </div>
    );

    if (!data) return (
        <div>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
    );

    const userData = data.data;

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
                                <AvatarImage src={`${IMAGE_URL}${userData.profile_photo_thumbnail_url}${userData.profile_photo_thumbnail_path}`} alt={userData.name} />
                                <AvatarFallback>{userData.name}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
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
