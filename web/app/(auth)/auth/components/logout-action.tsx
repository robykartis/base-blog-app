'use client'
import React from 'react'
import { useState } from "react"
import { CustomSession } from "@/app/api/auth/[...nextauth]/options"
import { signOut, useSession } from "next-auth/react"
import { LOGOUT_URL } from '@/lib/ApiURL'
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
import { Button } from '@/components/ui/button'

const LogoutActions = () => {
    const [logoutOpen, setLogOutOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    const { data } = useSession();
    const userSession = data as CustomSession;
    const dataSession = userSession?.user;
    const session = dataSession

    const logoutUser = async () => {
        setLoading(true);
        try {
            await axios.post(
                LOGOUT_URL,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${session?.tokens}`,
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
            <Dialog open={logoutOpen} onOpenChange={setLogOutOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apa Anda Yakin ?</DialogTitle>
                        <DialogDescription>
                            Tindakan ini akan mengakhiri sesi Anda dan Anda perlu masuk kembali untuk mengakses dasbor Anda.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-4">
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

export default LogoutActions