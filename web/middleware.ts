import { User } from "next-auth";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const tokens = req.nextauth.token;
    const user = tokens?.user as User; // Add type assertion here
    const level = user?.level ;
    console.log(level);
    const isAdmin = level.includes('admin');
    const isSu = level.includes('Superadmin');

    if (!tokens) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!isAdmin && !isSu) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
    return NextResponse.next();
  },
)

export const config = { matcher: ["/user"] }