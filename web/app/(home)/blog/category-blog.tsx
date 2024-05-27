import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CategoryBlog = () => {
    return (
        <>
            <section>
                <aside className="bg-muted rounded-lg  shadow-md p-6 sticky top-20">

                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="hover:text-blue-500" href="#">
                                    Category 1
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-blue-500" href="#">
                                    Category 2
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-blue-500" href="#">
                                    Category 3
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    alt="Popular Post Image"
                                    className="rounded-md"
                                    height={80}
                                    src="https://images.unsplash.com/photo-1714779573259-216b0cf746be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    style={{
                                        aspectRatio: "80/80",
                                        objectFit: "cover",
                                    }}
                                    width={80}
                                />
                                <div>
                                    <h4 className="text-lg font-bold">
                                        <Link href="#">Popular Post 1</Link>
                                    </h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img
                                    alt="Popular Post Image"
                                    className="rounded-md"
                                    height={80}
                                    src="https://images.unsplash.com/photo-1714779573259-216b0cf746be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    style={{
                                        aspectRatio: "80/80",
                                        objectFit: "cover",
                                    }}
                                    width={80}
                                />
                                <div>
                                    <h4 className="text-lg font-bold">
                                        <Link href="#">Popular Post 2</Link>
                                    </h4>
                                    <p className="text-gray-600">Sed auctor, magna vel aliquam lacinia, nisl nisl aliquam nisl.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </>
    )
}

export default CategoryBlog