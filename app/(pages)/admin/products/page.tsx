import  { format } from 'date-fns';
import React from 'react';
import ProductClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { ProductColumns } from './components/columns';
import { Products } from '@prisma/client';

interface ProductPageProps {
  params: {
    storeId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const Products: Products[] = await prismadb.products.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedProducts: ProductColumns[] = Products.map((item: Products) => ({
    id: item.id as string,
    name: item.productName,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductPage