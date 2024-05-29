'use client'

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import * as z from 'zod';
import { useForm } from "react-hook-form"
// import useSWRMutation from 'swr/mutation'

import axios from "@/lib/axios"


import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { IMAGE_URL, UPDATE_USER_URL } from "@/lib/ApiURL";
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image";

function DrawerUpdate({ token_type, tokens, data, onUpdateFinish }: { token_type: any, tokens: any, data: any, onUpdateFinish: () => void }) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorsRes, setErrors] = useState<any>({});
    const [pending, setPending] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const FormSchema = z.object({
        id: z.string().uuid(),
        name: z.string().min(1, { message: "Nama harus diisi" }),
        email: z.string().min(1, { message: 'Email harus diisi' }).email('dengan email valid'),
        username: z.string().min(1, { message: "Username harus diisi" }),
        profile_photo_path: z.custom((value) => {
            if (!value) return true; // Jika tidak ada file yang diunggah, dianggap valid
            if (!(value instanceof File)) return false; // Jika tidak sesuai tipe File, dianggap tidak valid
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            return validTypes.includes(value.type) && value.size <= maxSize;
        }, {
            message: 'Profile photo must be a file of type: jpg, jpeg, png and less than 2MB',
        }).optional(),
        old_password: z.optional(z.string()),
        new_password: z.optional(z.string()),
        new_c_password: z.optional(z.string()),
    }).refine((data) => {
        // Jika password diisi, konfirmasi password harus sama
        if (data.new_password && data.new_password !== data.new_c_password) {
            return false;
        }
        return true;
    }, {
        message: 'Password dan konfirmasi password tidak sama',
        path: ['new_c_password'],
    }).refine((data) => {
        // Jika salah satu diisi, keduanya harus diisi
        if ((data.new_password && !data.new_c_password) || (!data.new_password && data.new_c_password)) {
            return false;
        }
        return true;
    }, {
        message: 'Password dan konfirmasi password harus diisi keduanya',
        path: ['new_c_password'],
    });


    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: data.id,
            old_password: '',
            new_password: '',
            new_c_password: '',
            name: data.name,
            email: data.email,
            username: data.username,
            profile_photo_path: null,
        },
    });
    const onSubmit = (formData: z.infer<typeof FormSchema>) => {
        setPending(true);
        const url = `${UPDATE_USER_URL}/${data.id}`;
        axios
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: "application/json",
                    Authorization: `Bearer ${tokens}`,
                },
            })
            .then((res) => {
                const response = res;
                toast({
                    title: 'Success',
                    description: response?.data.message,
                    duration: 2000
                });
                router.refresh();
                setPending(false);

                onUpdateFinish();
            })
            .catch((error: any) => {
                console.log(error.response);
                setPending(false);
                if (error.response && error.response.data && error.response.data.message) {
                    setErrors(error.response.data.message);
                    toast({
                        variant: "destructive",
                        title: 'Error',
                        description: error.response?.data.message,
                        duration: 5000
                    });
                } else {
                    console.error("Gagal menyimpan data. Terjadi kesalahan pada server." + error);
                }
            });
    };
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            form.setValue('profile_photo_path', file);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px] lg:max-w-[950px] sm:rounded-md">
            <ScrollArea className="h-[500px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="mx-auto w-full max-w-full p-6">
                            <DrawerHeader className="justify-items-center ">
                                <DrawerTitle>Update User</DrawerTitle>
                                <DrawerDescription>Update informasi user</DrawerDescription>
                            </DrawerHeader>
                            <div className="grid items-start gap-4">
                                <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
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
                                    <div className="space-y-2">
                                        {isLoading ? (
                                            <Skeleton className="h-8 rounded-md mt-8" />
                                        ) : (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="username"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Username</FormLabel>
                                                            <Input
                                                                id="usernama"
                                                                placeholder="Username"
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
                            <div className="grid lg:grid-cols-1 md:grid-cols-1">

                                <div className="space-y-2">
                                    {isLoading ? (
                                        <Skeleton className="h-8 rounded-md mt-8" />
                                    ) : (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="old_password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Old Password</FormLabel>
                                                        <Input
                                                            type="password"
                                                            placeholder="Masukan Password Lama"
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
                                                name="new_password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>New Password</FormLabel>
                                                        <Input
                                                            type="password"
                                                            placeholder="Masukan Password Baru"
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
                                                name="new_c_password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm New Password</FormLabel>
                                                        <Input
                                                            type="password"
                                                            placeholder="Masukan Kembali Password"
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
                            <div className="grid lg:grid-cols-3 md:grid-cols-1">
                                <div className="space-y-2">
                                    {isLoading ? (
                                        <Skeleton className="h-8 rounded-md mt-8" />
                                    ) : (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="profile_photo_path"
                                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                                    <FormItem onChange={handleFileChange}>
                                                        <FormLabel>Profile Photo</FormLabel>
                                                        <Input
                                                            {...fieldProps}
                                                            placeholder="Profile Photo"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            }
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
                                        preview && (
                                            <Image
                                                src={preview}
                                                className="rounded-md py-4 px-4"
                                                alt="Profile Preview"
                                                quality={100}
                                                height={200}
                                                width={200}
                                            />
                                        )
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {isLoading ? (
                                        <Skeleton className="h-8 rounded-md mt-8" />
                                    ) : (
                                        <>
                                            <Image
                                                src={`${IMAGE_URL}${data.profile_photo_path_url}${data.profile_photo_path}`} alt={data.name}
                                                height={200}
                                                width={200}
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
                                            <Button type="submit" disabled={pending}>
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
            </ScrollArea>
        </DialogContent >
    )
}

export default DrawerUpdate;