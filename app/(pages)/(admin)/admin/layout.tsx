import Navbar from "@/components/navbar/Navbar";
import { authOption } from "@/lib/nextAuthOption";
import prismadb from "@/lib/prismadb.util";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "./loading";

const SetupLayoutAdmin: React.FC<{
    children: React.ReactNode;
}> = async ({ children }) => {

    // Get Session from next-auth;
    const session = await getServerSession(authOption());

    // Check exists session
    // if(!session?.user) redirect("/api/auth/signin");

    // Check permission
    // if(session.user && !session.user.isAdmin) redirect("/unauthorized?message=Access Denied")

    // Get result from entity Store with prismadb
    const store = await prismadb.store.findFirst({
        where: {
            user: session && session.user?.name
        }
    });
    // if (store) {
    //     redirect(`/admin/${store.id}`);
    // }
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </>
    );
};

export default SetupLayoutAdmin;