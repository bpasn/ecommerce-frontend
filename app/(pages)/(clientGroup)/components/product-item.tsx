'use client';
import FormatDigitToUsd from '@/components/store-format-digit'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ProductItemProps {
    id:string,
    category:string,
    title:string,
    name:string,
    description:string,
    price:number,
    oldPrice:number,
    image:string,
}

const ProductItem:React.FC<ProductItemProps> = ({
    id,
    name,
    category,
    title,
    description,
    price,
    oldPrice,
    image
}) => {
    return (
        <div className='w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>
            <div className='w-full h-[260px] relative'>
                <Image className='w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300' width={300} height={300} src={image} alt='imageProduct' />
                <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300'>
                    <span onClick={() => { }} className='w-full h-full border-b-[1px] border-gray-400 bg-white  flex-col flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <ShoppingCart />
                    </span>
                    <span onClick={() => { }} className='w-full h-full border-b-[1px] border-gray-400 bg-white  flex-col flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <Heart />
                    </span>
                </div>
            </div>
            <hr />
            <div className='px-4 py-3 flex flex-col gap-1'>
                <p className='text-xs text-gray-500 tracking-wide'>{category}</p>
                <p className='text-base font-medium'>{title}</p>
                <p className='flex items-center gap-2'>
                    <span className='text-sm line-through'>
                        <FormatDigitToUsd amount={oldPrice} />
                    </span>
                    <span className='text-amazon_blue font-semibold'>
                        <FormatDigitToUsd amount={price} />
                    </span>
                </p>
                <p className='text-xs text-gray-600 text-justify' >{description}</p>
                <button
                    onClick={() => { }}
                    className="h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
                    add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductItem