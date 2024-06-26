import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function ContactPage() {
    return (
        <>
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 py-12 px-6 md:px-8 lg:px-10">
                <article className="prose prose-gray max-w-none dark:prose-invert">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque modi eos dolore. Qui recusandae repellendus possimus molestiae labore a maiores, quis dicta. At ratione mollitia obcaecati sunt! Et, praesentium. Explicabo, expedita provident. Ipsa amet ex autem nostrum obcaecati mollitia eius explicabo id et! Accusamus tenetur ratione necessitatibus officia sequi at?
                        </p>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" required type="text" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" required type="email" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" required />
                            </div>
                            <Button type="submit">Send Message</Button>
                        </form>
                    </div>
                </article>

            </section>

        </>
    )
}
