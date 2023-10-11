"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface ProductColumns {
    id: string;
    productName: string;
    categoryName: string;
    price: string;
    qty: string;
    description:string;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumns>[] = [
    {
        accessorKey: "productName",
        header: "Product Name"
    },
    {
        accessorKey: "categoryName",
        header: "Category Name"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "qty",
        header: "QTY"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "actions",
        cell: (data) => <CellAction data={data.row.original} />
    }
]