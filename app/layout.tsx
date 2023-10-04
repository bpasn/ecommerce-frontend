import NextAuthProvider from '@/providers/authProvider';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '../styles/globals.css';
import {  getServerSession } from 'next-auth';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
  
}
