'use client';
import { cn, formatter } from '@/lib/utils';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Heading from '@/components/ui/heading';
import ProductItem from '../../components/product-item';
import axios from 'axios';

interface ProductDetailProps {
  product: IProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product
}) => {
  return (
    <>
      <div className="w-full grid md:grid-cols-3 gap-3  rounded-lg bg-white">
        <div className="flex items-center justify-center  rounded-lg relative group overflow-hidden">
          <Tab.Group as={"div"} className={"flex flex-row p-4 gap-3"}>
            <div className=" hidden p-x-2 sm:block ">
              <Tab.List className={"flex flex-col gap-3"}>
                {product.images.map(img => (
                  <Tab key={img} className={"relative flex cursor-pointer rounded-md"}>
                    {({ selected }) => {
                      return (
                        <div>
                          <span className={
                            cn("h-full w-full aspect-square inset-0 overflow-hidden rounded-md",)
                          }>
                            <Image alt='image-list' width={300} height={300} src={img} className='w-[90px] p-0.5 rounded-md object-contain' />
                          </span>
                        </div>
                      )
                    }}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className={"aspect-square w-full col-span-3"}>
              {product.images.map(img => (
                <Tab.Panel key={img} >
                  <div className="aspect-square relative h-full w-full sm:rounded-lg ">
                    <Image alt='image-list' width={300} height={300} src={img} className='h-full mx-auto object-cover object-center' />
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 p-4">
          <h1 className="text-sm sml:text-2xl text-amazon_blue font-semibold -mb-3">
            {product?.name}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-semibold -mb-3">
            {product?.category}
          </p>
          <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
            {product.title}
          </h1>

          <h2 className="text-sm font-semibold text-gray-600 dark:text-white">Descriptions</h2>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {product.description.feature.lists.map((l, i) => {
              if (i <= 3) {
                return (
                  <li className='text-sm' key={i + l.text}>
                    {l.text}
                  </li>
                )
              }
            })}
          </ul>
          <div className="align-bottom font-bold">
            <p className="text-base text-gray-600 flex items-center gap-1">
              Price:
              <span className="text-2xl  text-amazon_blue font-semibold">
                {formatter.format(Number(product.price))}
              </span>
            </p>
            <button
              onClick={() => { }}
              className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold">
              add to cart
            </button>
          </div>

        </div>
      </div>
      <div className="md:col-span-3 mt-4  rounded-lg">
        <Tab.Group as="div" className={"flex flex-col gap-0 "}>
          <Tab.List className={"flex flex-row"}>
            <Tab
              className={({ selected }) => cn(" border border-b-0 border-r-0 border-l-0 w-[150px]  rounded-t-lg max-w-[150px]  p-3 bg-white", selected && "border-t-orange-500")}>
              Description
            </Tab>
          </Tab.List>
          <Tab.Panels className={"w-full col-span-3 bg-white  rounded-lg rounded-tl-none"}>
            <Tab.Panel>
              <div className="px-16 mb-10">
                <h1 className="mt-10 text-lg font-bold mb-10">Description</h1>
                <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  {product.description.feature.lists.map((l) => (
                    <li className='text-sm ' key={l.text}>
                      {l.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="mt-10">
        <Heading title='RELATED PRODUCTS' description='' />
        
      </div>
    </>
  );
};

export default ProductDetail;