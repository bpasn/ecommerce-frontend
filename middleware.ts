import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log({ token })
    if (req.nextUrl.pathname.startsWith("/admin") && !token?.isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized?message=Permission denied", req.nextUrl))
    }
    NextResponse.next()
}

export const config = {
    matcher: ["/admin"]
}