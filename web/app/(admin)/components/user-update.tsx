'use client'

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import * as z from 'zod';
import { useForm } from "react-hook-form"
import useSWRMutation from 'swr/mutation'

import axios from "@/lib/axios"


import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { DETAIL_USER_URL, UPDATE_USER_URL } from "@/lib/ApiURL";
import { getUserDetail } from "@/app/api/Admin/User";


interface FormData {
    id: number;
    id_user: number;
    NamaUser: string;
    level: string;
    NoHp: string;
    JK: string;
    Email: string;
    password?: string;
    cPassword?: string;
}
function DrawerUpdate({ token_type, tokens, data, onUpdateFinish }: { token_type: any, tokens: any, data: any, onUpdateFinish: () => void }) {
    console.log(token_type);
    console.log(tokens);
    console.log(data);
    const { pending } = useFormStatus();
    const [errorsRes, setErrors] = useState<any>({});
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulasikan pemuatan data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Ubah durasi sesuai kebutuhan

        return () => clearTimeout(timer);
    }, []);


    // const ACCEPTED_IMAGE_MIME_TYPES = [
    //     "image/jpeg",
    //     "image/jpg",
    //     "image/png",
    //     "image/webp",
    // ];
    const MAX_FILE_SIZE = 1024 * 1024 * 5;
    const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
    const FormSchema = z.object({
        id: z.string(),
        name: z.string().min(1, { message: "Nama harus diisi" }),
        email: z.string().min(1, { message: 'Email harus diisi' }).email('dengan email valid'),
        profile_photo_path: z
            .any()
            .refine((files) => {
                return files?.[0]?.size <= MAX_FILE_SIZE;
            }, `Max image size is 5MB.`)
            .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
            ),
        old_password: z.string().optional(),
        password: z.string().optional(),
        c_password: z.string().optional()
    }).refine((data) => {
        if (data.password && data.password !== data.c_password) {
            throw new Error('Password dan konfirmasi password tidak sama');
        }
        if ((data.password && !data.c_password) || (!data.password && data.c_password)) {
            throw new Error('Password dan konfirmasi password harus diisi');
        }
        return true;
    }, {
        message: 'Password dan konfirmasi password tidak sama',
        path: ['c_password'],
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: data.id,
            old_password: '',
            password: '',
            c_password: '',
            name: data.name,
            email: data.email,
            profile_photo_path: null,
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData: any) => {

        try {
            const { password, cPassword, ...submissionData } = formData;
            if (!password && !cPassword) {
                delete submissionData.password;
            } else {
                if (password.length < 6 || password !== cPassword) {
                    throw new Error('Password dan konfirmasi password tidak sama atau kurang dari 6 karakter');
                }
                submissionData.password = password;
            }

            const response = await axios.post(
                UPDATE_USER_URL,
                submissionData,
                {
                    headers: {
                        Authorization: `${token_type}${tokens}`,
                    },
                }
            );
            router.refresh();
            toast({
                title: 'Success',
                description: response?.data.message,
                duration: 2000
            });
            onUpdateFinish();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
                toast({
                    title: 'Error',
                    description: error.response?.data.message,
                    duration: 5000
                });
            } else {
                console.error("Gagal menyimpan data. Terjadi kesalahan pada server.");
            }
        }
    };


    return (
        <DrawerContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className="mx-auto w-full max-w-full p-6">
                        <DrawerHeader className="justify-items-center">
                            <DrawerTitle>Update User</DrawerTitle>
                            <DrawerDescription>Update informasi user</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid items-start gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    {isLoading ? (
                                        <Skeleton className="h-8 rounded-md mt-8" />
                                    ) : (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nama User</FormLabel>
                                                        <Input
                                                            id="name"
                                                            placeholder="Name User"
                                                            {...field}
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {isLoading ? (
                                        <Skeleton className="h-8 rounded-md mt-8" />
                                    ) : (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <Input
                                                            id="email"
                                                            placeholder="Email User"
                                                            {...field}
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                {isLoading ? (
                                    <Skeleton className="h-8 rounded-md mt-8" />
                                ) : (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input
                                                        type="password"
                                                        placeholder="Masukkan Password"
                                                        {...field}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                            </div>
                            <div className="space-y-2">
                                {isLoading ? (
                                    <Skeleton className="h-8 rounded-md mt-8" />
                                ) : (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="c_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <Input
                                                        type="password"
                                                        placeholder="Masukkan Password"
                                                        {...field}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                            </div>
                        </div>

                        <DrawerFooter>
                            {isLoading ? (
                                <Skeleton className="h-8 rounded-md mt-8" />
                            ) : (
                                <>
                                    {pending ? (
                                        <Button disabled >
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Process...
                                        </Button>
                                    ) : (
                                        <Button disabled={pending}>
                                            Update
                                        </Button>
                                    )}
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </>
                            )}


                        </DrawerFooter>
                    </div>
                </form>
            </Form>
        </DrawerContent >
    )
}

export default DrawerUpdate;