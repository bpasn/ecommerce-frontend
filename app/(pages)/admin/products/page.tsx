import { format } from 'date-fns';
import React from 'react';
import ProductClient from './components/product-client';
import prismadb from '@/lib/prismadb.util';
import { ProductColumns } from './components/product-columns';
import { Products } from '@prisma/client';

interface ProductPageProps {
  params: {
    storeId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const Products = await prismadb.products.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedProducts: ProductColumns[] = Products.map((item) => ({
    id: item.id as string,
    productName: item.productName,
    categoryName: item.category.name,
    price: String(item.price.toFixed(2)),
    qty: String(item.qty),
    description: item.description!.length > 100 ? item.description!.substring(0, 70) + "..." : item.description!,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;