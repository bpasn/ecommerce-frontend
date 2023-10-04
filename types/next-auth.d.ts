import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
    interface Session {
        id?: string;
        error?: string;
        isAdmin?: boolean;
        user?: User;
    };

    interface User {
        name?: string;
        id?: string;
        email?: string | null;
        error?: string;
        isAdmin?: boolean;
        accessToken?:string;
        contactAddress?: {
            id?: string;
        }
    };
};

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {

        /** OpenID ID Token */
        id?: string;
        isAdmin?: boolean;
    }
}