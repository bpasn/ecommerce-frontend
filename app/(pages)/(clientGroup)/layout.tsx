'use client';
import Loading from '@/app/loading';
import NavbarClient from '@/components/navbar/NavbarClient';
import React, { Suspense } from 'react'


const RootClientLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <>
            <NavbarClient />
            <main className='bg-gray-200/100'>
                {children}
            </main>
        </>
    )
}

export default RootClientLayout