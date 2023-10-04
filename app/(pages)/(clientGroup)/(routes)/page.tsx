// 'use client';
import Banner from '@/components/Banner';
import React from 'react';
import ProductItem from '../components/product-item';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';

interface ClientPageProps {

}

const ClientPage: React.FC<ClientPageProps> = async ({
}) => {
  const { data: product } = await axios.get<IResponseBase<IProductModel[]>>("http://localhost:3000/api/product");
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-11 mb-10">
          <div className="-mt-8 w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {product.payload.map((product,i) => <ProductItem key={i} product={product} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientPage;