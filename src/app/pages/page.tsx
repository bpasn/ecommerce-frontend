import React from 'react'
import Header from '../components/navbar/Header'
import Banner from '../components/Banner'

type Props = {}

export default function MyApp(props: Props){
    return (
        <div>
            <Header />
            <div className="max-w-screen-2xl mx-auto">
                <Banner />
                <div className="relative -mt-10 z-20 mb-10">
                    <div className='w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}