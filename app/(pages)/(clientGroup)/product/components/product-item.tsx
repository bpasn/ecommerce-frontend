'use client';
import FormatDigitToUsd from '@/components/store-format-digit';
import { Button } from '@/components/ui/button';
import { useStoreCartStore } from '@/hooks/useCartHook';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProductItemProps {
    product: IProductModel;
}

const ProductItem: React.FC<ProductItemProps> = ({
    product
}) => {
    const cartStore = useStoreCartStore();
    const router = useRouter();
    return (
        <div className='w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>
            <div className='w-full h-[260px] relative'>
                <Image 
                onClick={() => router.push(`/product/${product.id}`)}
                className='cursor-pointer h-full object-contain w-full transition-transform duration-300 scale-90 hover:scale-100 ' 
                width={200} 
                height={200} 
                src={product.images[0]} 
                alt='imageProduct' />
                <div className='w-12 h-12 absolute bottom-10 right-0  bg-gray-300 rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300'>
                    <Button variant={'outline'} size={"icon"} onClick={() => cartStore.addToCart({ ...product, quantity: 1 })} className='w-full h-full  flex-col flex items-center justify-center text-xl bg-transparent cursor-pointer duration-300'>
                        <ShoppingCart />
                    </Button>
                </div>
            </div>
            <hr />
            <div className='px-4 py-3 flex flex-col gap-1 h-[120px]'>
                <p className='text-xl font-bold'>{product.name}</p>
                <p className='text-xs text-gray-500 tracking-wide'>{product.category.toUpperCase()}</p>
                <p className='text-base font-medium'>{product.title}</p>
                <p className='flex items-center gap-2'>
                    <span className='text-amazon_blue font-semibold'>
                        <FormatDigitToUsd amount={+product.price} />
                    </span>
                </p>
            </div>
            <button
                onClick={() => cartStore.addToCart({ ...product, quantity: 1 })}
                className="h-10 w-full font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
                add to cart
            </button>
        </div>
    );
};

export default ProductItem;