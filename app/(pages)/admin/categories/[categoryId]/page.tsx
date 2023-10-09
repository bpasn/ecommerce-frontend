import prismadb from '@/lib/prismadb.util';
import React from 'react';
import CategoryForm from '../components/category-form';

const CategoryPage = async ({
    params
}: { params: { CategoryId: string; }; }) => {
    const Category = await prismadb.category.findFirst({
        where: {
            id: params.CategoryId
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                Categories id
            </div>
        </div>
    );
};

export default CategoryPage;