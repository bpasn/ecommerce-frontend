'use client';
import { formatter } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProductDetailProps {
  product: IProductModel;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product
}) => {
  const desc: { text: string; }[] = JSON.parse(product?.description).feature.lists;
  return (
    <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">

        <Image
          src={product.images[0] as string}
          alt='product image'
          width={500}
          height={500}
        />

        <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
          <span
            onClick={() => { }}
            className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300">
            <ShoppingCart />
          </span>
        </div>
      </div>
      <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
        <p className="text-xl md:text-sm text-amazon_blue font-semibold -mb-3">
          {product?.name}
        </p>
        <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
          {product?.category}
        </p>
        <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
          product.title
        </h1>
        <ul className='list-disc gap-4'>
          {
            desc.map(l => (
              <li key={l.text} className='text-xs text-gray-600'>{l.text}</li>
            ))
          }
        </ul>
       
        <div>
          <p className="text-base text-gray-600 flex items-center gap-1">
            Price:
            <span className="text-lg text-amazon_blue font-ssemibold">
              {formatter.format(Number(product.price))}
            </span>
            <span className="ml-1 line-through">
              {formatter.format(Number(product.oldPrice))}
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
  );
};

export default ProductDetail;