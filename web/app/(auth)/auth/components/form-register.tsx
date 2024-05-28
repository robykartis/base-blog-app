'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from '@/components/ui/use-toast'
import axios from '@/lib/axios'
import { REGISTER_URL } from '@/lib/ApiURL'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'
import ButtonAuth from './button-auth'
import Link from 'next/link'

export default function FormRegister() {

    const [loading, setLoading] = useState<boolean>(false);
    const route = useRouter();
    const [errorsRes, setErrors] = useState<any>({});
    const { pending } = useFormStatus();

    const FormSchema = z.object({
        name: z.string().min(1, { message: "Nama harus diisi" }),
        email: z.string().min(1, { message: "Email harus diisi" }),
        username: z.string().min(1, { message: "Uername harus diisi" }),
        password: z.string().min(6, { message: 'Password harus diisi minimal 6 karakter' }),
        c_password: z.string().min(6, { message: 'Konfirmasi Password harus diisi minimal 6 karakter' })
    }).refine((data) => data.password === data.c_password, {
        path: ['c_password'],
        message: 'Password tidak sama',
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            c_password: "",
        },
    });

    const handleSubmit = (formData: z.infer<typeof FormSchema>) => {
        setLoading(true);
        axios
            .post(REGISTER_URL, formData, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => {
                const response = res;
                console.log(response);
                setLoading(false);
                if (response?.status == 200) {
                    signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        redirect: true,
                        callbackUrl: "/dashboard",
                    });
                    console.log(response.data)
                    localStorage.setItem("token", response.data.access_token)
                    localStorage.setItem("level", response.data.data.role)

                    toast({
                        title: 'Success',
                        description: response?.data.message,
                        duration: 2000
                    });

                } else if (response?.status == 401) {
                    toast({
                        title: 'Error',
                        description: response?.data.message,
                        duration: 2000
                    });

                }
            })
            .catch((error: any) => {
                console.log(error.response);
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = [];
                    if (error.response.data.message.email) {
                        errorMessage.push(error.response.data.message.email[0]);
                    }
                    if (error.response.data.message.username) {
                        errorMessage.push(error.response.data.message.username[0]);
                    }
                    if (errorMessage.length === 0) {
                        errorMessage.push('Unknown error');
                    }
                    toast({
                        variant: "destructive",
                        title: 'Error',
                        description: errorMessage.join(',  '),
                        duration: 5000
                    });
                } else {
                    console.error("Gagal menyimpan data. Terjadi kesalahan pada server." + error);
                }
            });
    };


    return (
        <>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient'>Register Account</CardTitle>
                        <CardDescription>
                            Register to your account to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} >
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </div>
                                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Username" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid glg:grid-cols-2 md:grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="c_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Confirm Password" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="py-4 space-y-4">
                                    <ButtonAuth label="Register" loading={loading} />
                                    <Link href="/">
                                        <Button variant="outline" className='w-full mt-4'>Cancel</Button>
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </CardContent>

                </Card>
            </div>
        </>
    )
}
