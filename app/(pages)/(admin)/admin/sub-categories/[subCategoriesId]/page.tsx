
import prismadb from '@/lib/prismadb.util';
import React from 'react';
import SubCategoryForm from '../components/sub-category-form';
import { Category, SubCategory } from '@prisma/client';

const SubCategoryPage = async ({
    params
}: { params: { subCategoriesId: string; }; }) => {
    const subcategory: SubCategory & {
        category: Category
    } | null = await prismadb.subCategory.findFirst({
        where: {
            id: params.subCategoriesId
        },
        include: {
            category: true
        }
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SubCategoryForm initialState={subcategory} />
            </div>
        </div>
    );
};

export default SubCategoryPage;