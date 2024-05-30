import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
    return (
        <>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                        <Link className="absolute inset-0 z-10" href="#">
                            <span className="sr-only">View</span>
                        </Link>
                        <Image
                            alt="Product 1"
                            className="object-cover w-full h-64"
                            height={400}
                            src="https://images.unsplash.com/photo-1714779573259-216b0cf746be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            style={{
                                aspectRatio: "500/400",
                                objectFit: "cover",
                            }}
                            width={500}
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                <Link href="#">Another Blog Post</Link>
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Sed auctor, magna vel aliquam lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <Link className="text-blue-500 hover:text-blue-700" href="#">
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
