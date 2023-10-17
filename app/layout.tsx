'use client';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '../styles/globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import AuthSessionProvider from '@/providers/authProvider';
import { getServerSession } from 'next-auth';
const RootLayout =  ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
        {/* <ReduxStoreProvider> */}
        {/* <AuthSessionProvider session={session}> */}
        <ToastProvider />
        <ModalProvider />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        {/* </AuthSessionProvider> */}
        {/* </ReduxStoreProvider> */}

      </body>
    </html>
  );

};
export default RootLayout;