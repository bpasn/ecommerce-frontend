"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface OrderColumns {
    orderId: string;
    total: string;
    product: string;
    phone: string;
    address: string;
    isPaid: string;
    createdAt: string;
}

export const columns: ColumnDef<OrderColumns>[] = [
    {
        accessorKey: "orderId",
        header: "Order Id"
    },
    {
        accessorKey: "total",
        header: "Total Price"
    },
    {
        accessorKey: "product",
        header: "Product"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "isPaid",
        header: "idPaid"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "actions",
        cell: (data) => <CellAction data={data.row.original} />
    }
];