'use client'
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/theme-toggle"

import { useState } from "react"
import { CustomSession, CustomUser } from "@/app/api/auth/[...nextauth]/options"
import { signOut, useSession } from "next-auth/react"
import { DETAIL_USER_URL, IMAGE_URL, LOGOUT_URL } from '@/lib/ApiURL'
import axios from "@/lib/axios"
import { toast } from '@/components/ui/use-toast'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer } from "@/components/ui/drawer"
import DrawerUpdate from "./user-update"
import BreadcrumbComponent from "./breadcrumb"
import { getUserDetail } from "@/app/api/Admin/User"

const HeaderAdmin = () => {

    const [logoutOpen, setLogOutOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerData, setDrawerData] = useState(null);

    console.log(drawerData);
    const { data } = useSession();
    const userSession = data as CustomSession;
    // console.log(userSession);
    const { access_token, token_type } = userSession?.user || {};
    // console.log(access_token, token_type);
    const userData: any = userSession?.user?.data || {};
    console.log(userData);
    const handleUpdateFinish = () => {
        setDrawerOpen(false); // Menutup Drawer setelah berhasil mengirimkan data update
    };
    const handleOpenDrawer = async () => {
        try {
            const { url, id, type_token, tokens } = {
                url: DETAIL_USER_URL,
                id: userData.id,
                tokens: access_token,
                type_token: token_type,
            };
            const res = await getUserDetail({ url, id, tokens, type_token });
            // console.log(res);
            setDrawerData(res.data);
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
                        Authorization: `${token_type} ${access_token}`,
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
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-foreground"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Users2 className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LineChart className="h-5 w-5" />
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                <BreadcrumbComponent />

                <div className="relative ml-auto flex-1 md:grow-0">

                    <ModeToggle />
                </div>
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
                        <DropdownMenuItem onClick={handleOpenDrawer}>
                            Setting
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setLogOutOpen(true)}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
                    {drawerOpen && drawerData && (
                        <DrawerUpdate token_type={token_type} tokens={access_token} data={drawerData} onUpdateFinish={handleUpdateFinish} />
                    )}
                </Dialog>
            </header>


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
    )
}

export default HeaderAdmin