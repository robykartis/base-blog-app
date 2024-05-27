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
                            Welcome to our blog, where we share our passion for all things web development, design, and
                            technology. Our mission is to provide our readers with informative, engaging, and easy-to-understand
                            content that helps them stay up-to-date with the latest trends and best practices in the industry.
                        </p>
                        <p>
                            Our team of experienced writers and subject matter experts curate a wide range of topics, from
                            responsive web design and CSS frameworks to JavaScript libraries and performance optimization.
                            Whether you're a seasoned developer or just starting out, you'll find something valuable on our
                            blog.
                        </p>
                        <p>
                            We believe that learning should be a continuous process, and we're committed to providing our
                            readers with the tools and resources they need to grow and improve their skills. From in-depth
                            tutorials to thought-provoking articles, our content is designed to inspire, educate, and empower
                            our readers.
                        </p>
                        <p>
                            Thank you for visiting our blog. We hope you find the information you're looking for and that it
                            helps you on your journey to becoming a better web developer, designer, or technologist. If you have
                            any questions or feedback, feel free to reach out to us. We're always happy to hear from our
                            readers!
                        </p>
                    </div>
                </article>

            </section>

        </>
    )
}

