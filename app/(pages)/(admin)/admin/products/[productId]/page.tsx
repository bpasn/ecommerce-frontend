import prismadb from '@/lib/prismadb.util';
import React from 'react';
import ProductForm from '../components/product-form';
import { OptionSelect } from '@/components/input-form';

const ProductPage = async ({
    params
}: { params: { productId: string; }; }) => {
    const product = await prismadb.products.findFirst({
        where: {
            id: params.productId
        },
        include: {
            images: true,
            description: {
                include: {
                    feature: {
                        include: {
                            lists: true
                        }
                    }
                }
            }
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
                <ProductForm categoryOption={formatCategoriesOption} initialState={{
                    id: product?.id!,
                    categoryId: product?.categoryId!,
                    productName: product?.productName!,
                    title: product?.title!,
                    price: product?.price!,
                    qty: product?.qty!,
                    sku: product?.sku!,
                    createdAt: product?.createdAt!,
                    updatedAt: product?.updatedAt!,
                    images: product?.images!,
                    description: product?.description!
                }} />
            </div>
        </div>
    );
};

export default ProductPage;