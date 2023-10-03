'use client';
import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';
import { getSession, signIn, signOut } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';

export default function MyApp() {
  const onOpen: () => void = useStoreModal(state => state.onOpen);
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button onClick={onOpen}>OpenModel</Button>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </>
    )
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
}