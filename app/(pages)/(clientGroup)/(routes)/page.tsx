// 'use client';
import Banner from '@/components/Banner';
import React from 'react'
import ProductItem from '../components/product-item';

interface ClientPageProps { }

const ClientPage: React.FC<ClientPageProps> = ({

}) => {
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-21 mb-10">
          <div className="-mt-8 w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* {[].map(item => <ProductItem key={item.id}/>)} */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ClientPage