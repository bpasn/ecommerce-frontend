'use client';
import FormatDigitToUsd from '@/components/store-format-digit';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/useReduxHook';
import { ICartItem, addToCart } from '@/redux/slice/cartReduce';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProductItemProps {
    product: IProductModel;
}

const ProductItem: React.FC<ProductItemProps> = ({
    product
}) => {
    const dispatch = useAppDispatch();
    return (
        <div className='w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>
            <div className='w-full h-[260px] relative'>
                <Image className='h-full object-contain transition-transform duration-300 scale-90 hover:scale-100 ' width={300} height={300} src={product.image} alt='imageProduct' />
                <div className='w-12 h-12 absolute bottom-10 right-0  bg-gray-300 rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300'>
                    <Button variant={'outline'} size={"icon"} onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} className='w-full h-full  flex-col flex items-center justify-center text-xl bg-transparent cursor-pointer duration-300'>
                        <ShoppingCart />
                    </Button>
                </div>
            </div>
            <hr />
            <div className='px-4 py-3 flex flex-col gap-1 h-[150px]'>
                <p className='text-xs text-gray-500 tracking-wide'>{product.category}</p>
                {/* <p className='text-base font-medium'>{product.title}</p> */}
                <p className='flex items-center gap-2'>
                    <span className='text-sm line-through'>
                        <FormatDigitToUsd amount={product.oldPrice} />
                    </span>
                    <span className='text-amazon_blue font-semibold'>
                        <FormatDigitToUsd amount={+product.price} />
                    </span>
                </p>
                <p className='text-xs text-gray-600 text-justify'>
                    {
                        product.description.length > 120
                            ? product.description.substring(0, 100) + "..."
                            : product.description
                    }
                </p>
            </div>
            <button
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                className="h-10 w-full font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
                add to cart
            </button>
        </div>
    );
};

export default ProductItem;