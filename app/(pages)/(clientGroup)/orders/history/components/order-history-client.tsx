'use client';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { orderHisgoryColumns as columns, OrdersColumns } from './order-history-columns';

interface OrdersClientProps {
    data: OrdersColumns[];
}

const OrdersHistoryClient: React.FC<OrdersClientProps> = ({
    data
}) => {
    return (
        <>
            <div className="mx-auto">
                <div className="px-6 py-4">
                    <h1 className="text-2xl mb-4 mt4">Orders</h1>
                </div>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} />
        </>
    );
};

export default OrdersHistoryClient;