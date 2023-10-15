import NextAuthProvider from '@/providers/authProvider';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '../styles/globals.css';
import { getServerSession } from 'next-auth';
import ReduxStoreProvider from '@/providers/ReduxStoreProvider';
import { Suspense } from 'react';
import Loading from './loading';

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();

  return (
    <NextAuthProvider session={session}>

      <html lang="en">
        <body>
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
          <ReduxStoreProvider>
            <ToastProvider />
            <ModalProvider />
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </ReduxStoreProvider>
        </body>
      </html>
    </NextAuthProvider>
  );

};
export default RootLayout;