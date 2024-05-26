
import Link from "next/link"
import CategoryBlog from "./category-blog"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>

            <div className="container lg:px-10 px-6 md:px-8 sm:px-3 py-6 ">
                <div className="flex md:flex-wrap justify-between">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Products</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 py-2 px-6 md:px-8 lg:px-10">
                {children}
                <CategoryBlog />
            </div>
        </>
    )
}