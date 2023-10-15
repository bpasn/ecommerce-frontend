import { format } from 'date-fns';
import React from 'react';
import OrderClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { OrderColumns } from './components/columns';
import { formatter, wait } from '@/lib/utils';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Page"
};
interface OrderPageProps {
  params: {
    storeId: string;
  };
}

const OrderPage: React.FC<OrderPageProps> = async ({
  params
}) => {
  await wait(200)
  const _Orders = await prismadb.orders.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      orderItem: {
        include: {
          product: true
        }
      }
    }
  });

  const formattedOrders: OrderColumns[] = _Orders.map((item) => ({
    orderId: item.id as string,
    product: item.orderItem.map(order => order.product).join(' ,'),
    total: formatter.format(item.orderItem.reduce((total, item) => total + Number(item.product.price), 0)),
    isPaid: String(item.isPain),
    address:item.address,
    phone:item.phone,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;