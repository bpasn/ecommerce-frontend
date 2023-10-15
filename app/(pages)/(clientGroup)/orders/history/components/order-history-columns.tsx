"use client";

import { ColumnDef, RowData } from '@tanstack/react-table';
import { OrderHistoryCellAction } from './order-history-cell-action';


export interface OrdersColumns {
    id:string;
    total:string;
    paid:string;
    address:string;
    phone:string;
}

export const orderHisgoryColumns: ColumnDef<OrdersColumns>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "total",
        header: "TOTAL",
    },
    {
        accessorKey: "paid",
        header: "PAID",
    },
    {
        accessorKey: "phone",
        header: "PHONE",
    },
    {
        accessorKey: "address",
        header: "ADDRESS",
    },
    {
        id: "actions",
        cell: (data) => <OrderHistoryCellAction data={data.row.original} />
    }
];