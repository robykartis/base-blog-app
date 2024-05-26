class Env{
    static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
    static API_APP: string = process.env.NEXTAUTH_URL as string;
}
export default Env