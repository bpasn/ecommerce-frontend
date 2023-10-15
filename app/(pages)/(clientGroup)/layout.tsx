'use client';
import NavbarClient from '@/components/navbar/NavbarClient';
import React, { Suspense } from 'react'
import Loading from './loading';


const RootClientLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <>
            <NavbarClient/>
            <Suspense fallback={<Loading/>}>
            {children}
            </Suspense>
        </>
    )
}

export default RootClientLayout