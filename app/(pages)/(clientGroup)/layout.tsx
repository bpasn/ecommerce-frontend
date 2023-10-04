'use client';
import NavbarClient from '@/components/navbar/NavbarClient';
import React from 'react'


const RootClientLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <>
            <NavbarClient />
            {children}
        </>
    )
}

export default RootClientLayout