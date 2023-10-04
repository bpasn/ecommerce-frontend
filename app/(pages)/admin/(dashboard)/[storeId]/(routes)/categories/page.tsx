import dateFns, { format } from 'date-fns';
import React from 'react';
import CategoryClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { CategoryColumns } from './components/columns';
import { Category } from '@prisma/client';

interface CategoryPageProps {
  params: {
    storeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params
}) => {
  const categorys: Category[] = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
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
        <CategoryClient data={[
          {
            id: "1",
            name: "create-e-commerce-1",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
          {
            id: "2",
            name: "create-e-commerce-2",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
          {
            id: "3",
            name: "create-e-commerce-3",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
        ]} />
      </div>
    </div>
  )
}

export default CategoryPage