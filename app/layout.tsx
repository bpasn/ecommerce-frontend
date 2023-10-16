'use client';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import '../styles/globals.css';
import { Suspense } from 'react';
import Loading from './loading';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <html lang="en">
      <body>
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
        {/* <ReduxStoreProvider> */}
        <ToastProvider />
        <ModalProvider />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        {/* </ReduxStoreProvider> */}

      </body>
    </html>
  );

};
export default RootLayout;