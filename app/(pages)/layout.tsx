import { authOption } from '@/lib/nextAuthOption';
import AuthSessionProvider from '@/providers/authProvider';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import Loading from '../loading';

const RootLayoutPage: React.FC<{
    children: React.ReactNode;
}> = async ({
    children
}) => {
        const session = await getServerSession();
        return (
            <AuthSessionProvider session={session}>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </AuthSessionProvider>
        );
    };

export default RootLayoutPage;