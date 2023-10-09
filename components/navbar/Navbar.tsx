'use client';
import React from 'react'
import MainNav from '@/components/navbar/MainNav'
import { redirect } from 'next/navigation'
import StoreDropDown from '../store-dropdown'
import { useSession } from 'next-auth/react'

type Props = {}

const Navbar =  (props: Props) => {
  const {data:session} = useSession();
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  // const stores = await prismadb.store.findMany({
  //   where: {
  //     user: session.user.name
  //   }
  // })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <StoreDropDown />
        </div>
      </div>
    </div>
  )
}

export default Navbar