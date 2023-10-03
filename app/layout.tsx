import NextAuthProvider from '@/providers/authProvider';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '@/styles/globals.css';
import { Session, getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
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
  )
}
