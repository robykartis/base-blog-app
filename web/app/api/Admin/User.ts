'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export async function getToken() {
    const session: any | null = await getServerSession(authOptions);
    const tokens = session
    return tokens
}
// console.log(getToken())
interface DataProps {
    id_user?: any,
    type_token?: string
    url_api?: string
    data_token?: string
}
export const getUserDetail = async ({ url_api, id_user,type_token, data_token }: DataProps) => {
    const response = await fetch(`${url_api}${id_user}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${type_token} ${data_token}`,
        },
    });
    // console.log(response);
    return response.json();
};


