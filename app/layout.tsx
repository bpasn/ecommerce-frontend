import NextAuthProvider from '@/providers/authProvider';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '../styles/globals.css';
import { getServerSession } from 'next-auth';
import ReduxStoreProvider from '@/providers/ReduxStoreProvider';
import LoadingProvider from '@/providers/LoadingProvider';

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
          <LoadingProvider >
          <ReduxStoreProvider>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ReduxStoreProvider>
          </LoadingProvider>
        </body>
      </html>
    </NextAuthProvider>
  );

};
export default RootLayout;