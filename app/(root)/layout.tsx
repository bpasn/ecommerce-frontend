import { authOption } from '@/lib/nextAuthOption';
import prismadb from '@/lib/prismadb.util';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const SetupLayout: React.FC<Props> = async ({ children }) => {

    const session = await getServerSession(authOption());
    //console.log(session?.user?.name)
    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    const billboard = await prismadb.billboard.findFirst
    const store = await prismadb.store.findFirst({
        where: {
            user: session.user?.name
        }
    });
    //console.log(store)
    if (store) {
        redirect(`/${store.id}`)
    }
    return (
        <>
            {children}
        </>
    )
}

export default SetupLayout