import React from 'react'
import MainNav from '@/components/navbar/MainNav'
import StoreSwitcher from '@/components/store-switcher'
import prismadb from '@/lib/prismadb.util'
import { getServerSession } from 'next-auth'
import { authOption } from '@/lib/nextAuthOption'
import { redirect } from 'next/navigation'
import StoreDropDown from '../store-dropdown'

type Props = {}

const Navbar = async (props: Props) => {
  const session = await getServerSession(authOption());
  if (!session?.user) {
    redirect('/api/auth/signin');
  }
  const stores = await prismadb.store.findMany({
    where: {
      user: session.user.name
    }
  })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <StoreDropDown />
        </div>
      </div>
    </div>
  )
}

export default Navbar