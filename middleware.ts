import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://cleark.com/docs/references/nextjs/auth-middleware for more information about configuring you middleware
export default authMiddleware({});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/cart','/(api|trpc)(.*)']
}