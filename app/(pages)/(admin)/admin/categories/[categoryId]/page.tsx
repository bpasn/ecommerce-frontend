import prismadb from '@/lib/prismadb.util';
import React from 'react';
import CategoryForm from '../components/category-form';

const CategoryPage = async ({
    params
}: { params: { categoryId: string; }; }) => {
    const category = await prismadb.category.findFirst({
        where: {
            id: params.categoryId
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initalState={category} />
            </div>
        </div>
    );
};

export default CategoryPage;