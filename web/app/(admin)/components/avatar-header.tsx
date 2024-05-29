'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DETAIL_USER_URL, IMAGE_URL, LOGOUT_URL } from '@/lib/ApiURL'
import axios from '@/lib/axios';
import React, { useState } from 'react'
import useSWR from 'swr';
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import DrawerUpdate from "./user-update"
import { ReloadIcon } from "@radix-ui/react-icons"


const AvatarHeader = ({ token_type, token_access, id }: any) => {
    // console.log(id);
    const [logoutOpen, setLogOutOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerData, setDrawerData] = useState(null);
    async function fetcher(url: string) {
        // console.log(`Fetching data from ${url}`);
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token_access}`,
            },
        });
        // console.log(response);
        return response.data;
    }

    const { data, mutate, error } = useSWR(`${DETAIL_USER_URL}${id}`, fetcher, {
        // refreshInterval: 1000
    });

    // console.log(data);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /></div>;

    const userData = data.data

    const handleUpdateFinish = () => {
        setDrawerOpen(false); // Menutup Drawer setelah berhasil mengirimkan data update
    };
    const handleOpenDrawer = () => {
        try {
            setDrawerData(userData);
            setDrawerOpen(true);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: 'Error',
                description: error.response?.data.message,
                duration: 5000
            });
        }
    };
    const logoutUser = async () => {
        setLoading(true);
        try {
            await axios.post(
                LOGOUT_URL,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token_access}`,
                    },
                }
            );
            signOut({
                callbackUrl: "/",
                redirect: true,
            });
            toast({
                title: 'Success',
                description: 'Logout Success',
                duration: 2000
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data.message,
                duration: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <AvatarImage
                                src={`${IMAGE_URL}${userData.profile_photo_thumbnail_url}${userData.profile_photo_thumbnail_path}`}
                                alt={userData.name}
                            />
                            <AvatarFallback>{userData.name}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleOpenDrawer}>
                        Setting
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLogOutOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
                {drawerOpen && drawerData && (
                    <DrawerUpdate token_type={token_type} tokens={token_access} data={drawerData} onUpdateFinish={handleUpdateFinish} />
                )}
            </Dialog>

            <Dialog open={logoutOpen} onOpenChange={setLogOutOpen}>
                <DialogContent className=" justify-items-center ">
                    <DialogHeader>
                        <DialogTitle className="text-center">Apa Anda Yakin ?</DialogTitle>
                        <DialogDescription className="text-center">
                            Tindakan ini akan mengakhiri sesi Anda dan Anda perlu masuk kembali untuk mengakses dasbor Anda.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex  space-x-4">
                        {loading ? (
                            <Button variant="destructive" onClick={logoutUser}>
                                Ya Logout!
                            </Button>
                        ) : (
                            <Button variant="destructive">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Process...
                            </Button>
                        )}
                        <DialogClose>
                            <Button>Batal</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AvatarHeader;