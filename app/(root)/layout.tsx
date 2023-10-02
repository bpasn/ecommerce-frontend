'use client';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            {/* <Header /> */}
            <main>{children}</main>
            {/* <footer>footer</footer> */}
        </div>
    )
}

export default RootLayout