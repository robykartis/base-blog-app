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
import { LOGIN_URL, REGISTER_URL } from '@/lib/ApiURL'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'
import ButtonAuth from './button-auth'
import Link from 'next/link'

export default function FormLogin() {

    const [loading, setLoading] = useState<boolean>(false);
    const route = useRouter();
    const [errorsRes, setErrors] = useState<any>({});
    const { pending } = useFormStatus();

    const FormSchema = z.object({
        email: z.string().email().min(1, { message: "Email harus diisi" }),
        password: z.string().min(3, { message: 'Password harus diisi minimal 6 karakter' }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (formData: z.infer<typeof FormSchema>) => {
        setLoading(true);
        axios
            .post(LOGIN_URL, formData, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => {
                const response = res;
                // console.log(response);
                setLoading(false);
                if (response?.status == 200) {
                    signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        redirect: true,
                        callbackUrl: "/dashboard",
                    });
                    setLoading(false);
                    // console.log(response.data)
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


    return (
        <>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient'>Login Account</CardTitle>
                        <CardDescription>
                            Login to your account to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} >
                                <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="py-4 space-y-4">
                                    <ButtonAuth label="Login" loading={loading} />
                                    <Link href="/" >
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
