import { authOption } from '@/lib/nextAuthOption';
import AuthSessionProvider from '@/providers/authProvider';
import { getServerSession } from 'next-auth';
import React from 'react';

const RootLayoutPage: React.FC<{
    children: React.ReactNode;
}> = async ({
    children
}) => {
    const session = await getServerSession(authOption())
        return (
            <AuthSessionProvider session={session}>
               {children}
            </AuthSessionProvider>
        );
    };

export default RootLayoutPage;