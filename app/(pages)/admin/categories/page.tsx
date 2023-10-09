import dateFns, { format } from 'date-fns';
import React, { useState } from 'react';
import CategoryClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { CategoryColumns } from './components/columns';
import { Category } from '@prisma/client';
import StoreModalForm from '@/components/modals/store-modal-forms';
import CategoryForm, { CategoryFormValues } from './components/category-form';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useStoreAlert } from '@/hooks/useStoreAlert';
import { useStoreModalForm } from '@/hooks/useStoreModalForm';

interface CategoryPageProps {
  params: {
    storeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params
}) => {
  const categorys: Category[] = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedCategorys: CategoryColumns[] = categorys.map((item: Category) => ({
    id: item.id as string,
    name: item.name,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategorys} />
      </div>
    </div>
  )
}

export default CategoryPage