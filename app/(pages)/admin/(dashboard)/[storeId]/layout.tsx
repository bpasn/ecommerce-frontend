import Navbar from '@/components/navbar/Navbar';
import { authOption } from '@/lib/nextAuthOption';
import prismadb from '@/lib/prismadb.util';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

interface DashboardProps {
    children: React.ReactNode;
    params: { storeId: string }
}

const DashboardLayout: React.FC<DashboardProps> = async ({
    children,
    params
}) => {
    const session = await getServerSession(authOption());
    
    if (!session?.user) redirect("/api/auth/signin");

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            user: session.user.name
        }
    });
    
    if (!store) redirect('/admin');
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default DashboardLayout