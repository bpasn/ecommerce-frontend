// 'use client';
import Banner from '@/components/Banner';
import React, { useCallback, useEffect, useState } from 'react';
import ProductItem from './components/product-item';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import StoreSwitcher from '@/components/store-switcher';
import { cn } from '@/lib/utils';
import { IFindByName } from '@/services/product/product';

interface ClientPageProps {

}

const ClientPage: React.FC<ClientPageProps> = async ({
}) => {

  const { data: product } = await axios.get<IResponseBase<IProductModel[]>>("http://localhost:3000/api/products");

  return (
    <main  className="max-w-screen-2xl mx-auto">
      <Banner />
      {/* <div className="rerative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-21 mb-10">
          <StoreSwitcher className={cn("z-50")}/>
        </div> */}
      {/*  */}
      <div>
        <div className="relative sml:mt-[3rem] md:mt-[6rem] lg:mt-[8rem] z-11 mb-10">
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {product.payload.map((product, i) => <ProductItem key={i} product={product} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientPage;