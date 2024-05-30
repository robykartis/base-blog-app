import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Home`,
    description: 'Build digital experiences for any tech stack, visually.',
}

export default function AboutPage() {
    return (
        <>
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 py-12 px-6 md:px-8 lg:px-10">
                <article className="prose prose-gray max-w-none dark:prose-invert">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Our Blog</h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                        </p>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                        </p>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                        </p>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi eos eius odio molestiae numquam, eaque quia veniam rem! Velit perferendis, ad, aspernatur ratione, repellat culpa nesciunt obcaecati placeat ullam possimus reprehenderit quam nemo eum voluptas nam blanditiis? Vel quis explicabo reprehenderit nobis ipsum quae temporibus, eaque, doloremque possimus architecto asperiores!
                        </p>
                    </div>
                </article>

            </section>

        </>
    )
}

