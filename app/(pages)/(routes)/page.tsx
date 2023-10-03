'use client';
import { signIn, signOut } from 'next-auth/react';
import React from 'react'

type Props = {}

const ClientPage = (props: Props) => {
  return (
    <div><button onClick={() => signIn()}>signin</button></div>
  )
}

export default ClientPage