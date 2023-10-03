import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import GithubProvider from 'next-auth/providers/github';
export const authOption = (): NextAuthOptions => {
    return ({
        pages: {
            signOut: "/api/auth/signin"
        },
        secret: process.env.AUTH_SECRET,
        session: { strategy: 'jwt' },
        callbacks: {
            async jwt({ token, user }: { token: JWT; user?: User }) {
                if (user?.id) token.id = user.id;
                if (user?.isAdmin) token.isAdmin = user.isAdmin
                return { ...token, user };
            },
            async session({ session, token }: { session: Session, token: JWT }) {

                if (token?.id && session.user) session.user.id = token.id;
                if (token?.isAdmin && session.user) session.user.isAdmin = token.isAdmin
                return Promise.resolve({ ...session, token });
            }
        },
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID || "",
                clientSecret: process.env.GITHUB_SECRET || ""
            })
        ],
        logger: {
            error(code, metadata) {
                //console.log('authError', { code, metadata });
            },
        },
    })
};


