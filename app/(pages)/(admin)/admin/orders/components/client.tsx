'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { columns, OrderColumns } from './columns';
import Heading from '@/components/ui/heading';
import ApiList from './api-list';

interface OrdersClientProps {
    data: OrderColumns[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Orders(${data.length})`}
                    description='Orderss'
                />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} />
            <Separator />
            <Heading
                title='Api'
                description='API calls for Orders'
            />
            <ApiList
                entityName={'Orders'}
                entityIdName={"OrdersId"}
            />
        </>
    );
};

export default OrdersClient;