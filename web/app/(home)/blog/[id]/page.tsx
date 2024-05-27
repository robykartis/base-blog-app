import Link from "next/link"

export default function BlogDetailPage({ params }: { params: any }) {
    return (
        <>
            <section>
                <div className="grid grid-cols-1  gap-8">
                    <article className="prose prose-gray max-w-full dark:prose-invert">
                        <div className="space-y-4">
                            <img
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
                                Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                                throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
                            </p>
                            <p>
                                Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
                                place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he
                                couldn't seem to stop Jokester.
                            </p>
                            <p>
                                And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny
                                that they couldn't help but laugh. And once they started laughing, they couldn't stop.
                            </p>
                            <blockquote>
                                “After all,” he said, “everyone enjoys a good joke, so it's only fair that they should pay for the
                                privilege.”
                            </blockquote>
                            <h2>The Joke Tax</h2>
                            <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
                            <ul>
                                <li>1st level of puns: 5 gold coins</li>
                                <li>2nd level of jokes: 10 gold coins</li>
                                <li>3rd level of one-liners : 20 gold coins</li>
                            </ul>
                            <p>
                                As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person
                                who refused to let the king's foolishness get him down: a court jester named Jokester.
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}
