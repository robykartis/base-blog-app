import * as React from "react"
import HeaderAdmin from "./components/header-admin"
import SidebarAdmin from "./components/sidebar-admin"
import NextAuthSessionProvider from "@/providers/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { SWRProvider } from "@/lib/swr-provider"

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const session: any | null = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
        redirect("/");
    }
    return (
        <>
            <NextAuthSessionProvider>
                <SWRProvider>
                    <div className="flex min-h-screen w-full flex-col bg-muted/40">
                        <SidebarAdmin />
                        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                            <HeaderAdmin />
                            <main>
                                {children}
                            </main>

                        </div>
                    </div>
                </SWRProvider>
            </NextAuthSessionProvider>
        </>
    )
}