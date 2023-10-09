import prismadb from '@/lib/prismadb.util';
import React from 'react';
import ProductForm from '../components/product-form';

const ProductPage = async ({
    params
}: { params: { productId: string; }; }) => {
    const Product = await prismadb.products.findFirst({
        where: {
            id: params.productId
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initalState={Product} />
            </div>
        </div>
    );
};

export default ProductPage;