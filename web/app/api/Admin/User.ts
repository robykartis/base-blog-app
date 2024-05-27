interface DataProps {
    id?: any,
    type_token?: string
    url?: string
    tokens?: string
}
export const getUserDetail = async ({ url, id,type_token, tokens }: DataProps) => {
    const response = await fetch(`${url}${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${type_token} ${tokens}`,
        },
    });
    // console.log(response);
    return response.json();
};