import Link from 'next/link'
import React from 'react'

const FooterHomeComponent = () => {
    return (
        <>
            <footer className="bg-muted-1/2  py-6 px-6 md:px-8 lg:px-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">© 2024 My Blog. All rights reserved.</p>
                    </div>
                    <nav className="flex space-x-4">
                        <Link className="hover:text-gray-300" href="#">
                            Home
                        </Link>
                        <Link className="hover:text-gray-300" href="#">
                            Blog
                        </Link>
                        <Link className="hover:text-gray-300" href="#">
                            About
                        </Link>
                        <Link className="hover:text-gray-300" href="#">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </>
    )
}

export default FooterHomeComponent