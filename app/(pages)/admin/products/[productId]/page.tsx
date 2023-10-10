import prismadb from '@/lib/prismadb.util';
import React from 'react';
import ProductForm from '../components/product-form';
import { OptionSelect } from '@/components/input-form';

const ProductPage = async ({
    params
}: { params: { productId: string; }; }) => {
    const Product = await prismadb.products.findFirst({
        where: {
            id: params.productId
        },
        include: {
            image: true,
        }
    });

    const Categories = await prismadb.category.findMany();

    const formatCategoriesOption: OptionSelect[] = Categories.map(c => ({
        name: c.name,
        value: c.id
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialState={Product} categoryOption={formatCategoriesOption} />
            </div>
        </div>
    );
};

export default ProductPage;