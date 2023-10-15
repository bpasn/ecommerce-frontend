import { format } from 'date-fns';
import React from 'react';
import OrdersClient from './components/order-history-client';
import prismadb from '@/lib/prismadb.util';
import { OrdersColumns } from './components/order-history-columns';
import { Orders } from '@prisma/client';
import { Metadata } from 'next';
import { formatter, wait } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders Page"
};
interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

const OrdersHistoryPage: React.FC<OrdersPageProps> = async ({
  params
}) => {
  await wait(200);
  const orders = await prismadb.orders.findMany({
    include: {
      orderItem: true,

    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedOrders: OrdersColumns[] = orders.map((item) => ({
    id: item.id as string,
    total: String(item.total),
    paid: String(item.isPain),
    address: item.address || '-',
    phone:item.phone || '-'
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersHistoryPage;