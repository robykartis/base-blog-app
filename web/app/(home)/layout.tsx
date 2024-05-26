
import HeaderHomeComponent from "./components/header-home"
import FooterHomeComponent from "./components/footer-home"
export default function HomeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <HeaderHomeComponent />
                <main className="flex-1">
                    {children}
                </main>
                <FooterHomeComponent />
            </div>
        </>
    )
}
