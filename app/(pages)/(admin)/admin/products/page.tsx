import { format } from 'date-fns';
import React from 'react';
import ProductClient from './components/product-client';
import prismadb from '@/lib/prismadb.util';
import { ProductColumns } from './components/product-columns';
import { Metadata } from 'next';
import { wait } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Products",
  description: "Products Page"
};
interface ProductPageProps {
  params: {
    storeId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  await wait(200);
  const Products = await prismadb.products.findMany({
    include: {
      category: true,
      description: {
        include: {
          feature: {
            include: {
              lists: true
            }
          },
        }
      }
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
    description: JSON.stringify(item.description!),
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