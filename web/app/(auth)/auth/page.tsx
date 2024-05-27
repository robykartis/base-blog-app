
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import FormLogin from "./components/form-login"
import FormRegister from "./components/form-register"
import "./css-auth.css";
export default function AuthPage() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 md:p-8 ">
            <Tabs defaultValue="login" className="w-[600px] ">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <FormLogin />
                </TabsContent>
                <TabsContent value="register">
                    <FormRegister />
                </TabsContent>
            </Tabs>
        </div>

    )
}
