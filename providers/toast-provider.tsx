'use client';
import React from 'react'
import { Toaster } from 'react-hot-toast'
type Props = {}

const TosterProvider = (props: Props) => {
    return <Toaster toastOptions={{
        duration: 3 * 1000
    }}/>
}

export default TosterProvider;