import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const { pathname, origin } = req.nextUrl;
    //console.log({ token })
    if (req.nextUrl.pathname.startsWith("/admin") && !token?.isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized?message=Permission denied", req.nextUrl))
    }
    if (req.url.startsWith("/cart") && !token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl))
    }
    NextResponse.next()
}
