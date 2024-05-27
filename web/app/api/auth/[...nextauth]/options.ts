import { LOGIN_URL } from "@/lib/ApiURL"; 
import axios from "@/lib/axios"; 
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
  user?: CustomUser;
  roles?: string;
  level?: string;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  nama?: string | null;
  email?: string | null;
  level?: string | null;
  access_token?: string;
  data?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session}) {
      // Jika user ada, tambahkan user ke dalam token
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  session:{
    strategy: "jwt",
    maxAge: 60 * 60, // Durasi sesi maksimum adalah 1 jam (dalam detik)
  },  

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          // Kirim permintaan login ke server
          const res = await axios.post(LOGIN_URL, credentials);
          console.log(res);
          const response = res.data;
          const user = response;
          console.log(user);
          if (user) {
            // Jika berhasil login, kembalikan data user
            return user;
          } else {
            // Jika tidak ada data user, tangani kasus ini
            return null;
          }
          
        } catch (error) {
          // Tangani error di sini
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
};