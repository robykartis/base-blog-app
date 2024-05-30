import Image from "next/image"
import Link from "next/link"

export default function BlogDetailPage({ params }: { params: any }) {
    return (
        <>
            <section>
                <div className="grid grid-cols-1  gap-8">
                    <article className="prose prose-gray max-w-full dark:prose-invert">
                        <div className="space-y-4">
                            <Image
                                alt="Blog post image"
                                className="rounded-lg object-cover w-full"
                                height="400"
                                src="https://images.unsplash.com/photo-1714779573259-216b0cf746be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                style={{
                                    aspectRatio: "800/400",
                                    objectFit: "cover",
                                }}
                                width="800"
                            />
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                    Mastering the Art of Responsive Web Design
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
                            </div>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                            </p>
                            <blockquote>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                            </blockquote>
                            <h2>The Joke Tax</h2>
                            <p>The kings subjects were not amused. They grumbled and complained, but the king was firm:</p>
                            <ul>
                                <li>1st level of puns: 5 gold coins</li>
                                <li>2nd level of jokes: 10 gold coins</li>
                                <li>3rd level of one-liners : 20 gold coins</li>
                            </ul>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}
