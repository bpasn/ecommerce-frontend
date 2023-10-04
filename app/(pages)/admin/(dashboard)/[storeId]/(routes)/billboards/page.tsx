import dateFns, { format } from 'date-fns';
import React from 'react';
import BillboardClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { BillboardColumns } from './components/columns';
import { Billboard } from '@prisma/client';

interface BillboardPageProps {
  params: {
    storeId: string;
  }
}

const BillboardPage: React.FC<BillboardPageProps> = async ({
  params
}) => {
  console.log({params})
  const billboards: Billboard[] = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedBillboards: BillboardColumns[] = billboards.map((item: Billboard) => ({
    id: item.id as string,
    label: item.label,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));


  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={[
          {
            id: "1",
            label: "create-ecommerce-1",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
          {
            id: "2",
            label: "create-ecommerce-2",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
          {
            id: "3",
            label: "create-ecommerce-3",
            createdAt: format(new Date(),"MMM do, yyyy")
          },
        ]} />
      </div>
    </div>
  )
}

export default BillboardPage