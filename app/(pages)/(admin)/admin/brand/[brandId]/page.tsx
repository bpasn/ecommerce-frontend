import prismadb from '@/lib/prismadb.util';
import React from 'react';
import BrandForm from '../components/brand-form';

const BrandPage = async ({
    params
}: { params: { brandId: string; }; }) => {
    const brand = await prismadb.brand.findFirst({
        where: {
            id: params.brandId
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BrandForm initialState={brand}  />
            </div>
        </div>
    );
};

export default BrandPage;