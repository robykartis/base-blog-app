import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation"

export default async function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const session: any | null = await getServerSession(authOptions);
    // console.log(session);
    if (session) {
        redirect("/dashboard");
    }
    return (
        <>
            {children}
        </>

    )
}