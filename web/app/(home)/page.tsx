import Link from "next/link"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Home`,
    description: 'Build digital experiences for any tech stack, visually.',
}

export default function HomePage() {
    return (
        <>
            <section className=" py-20 px-6 md:px-8 lg:px-10">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
                    <p className="text-lg mb-8">Explore a wide range of topics and discover new insights.</p>
                    <Link
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
                        href="#"
                    >
                        View Blog
                    </Link>
                </div>
            </section>
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-6 md:px-8 lg:px-10">
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

            </section>

        </>
    )
}

