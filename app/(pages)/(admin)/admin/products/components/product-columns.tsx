"use client";

import { ColumnDef, RowData } from '@tanstack/react-table';
import { CellAction } from './product-cell-action';


export interface ProductColumns {
    id: string;
    name: string;
    categoryName: string;
    price: string;
    qty: string;
    description: string;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumns>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
        size:100,
        maxSize:100,
    },
    {
        accessorKey: "categoryName",
        header: "Category Name",
        size: 100

    },
    {
        accessorKey: "price",
        header: "Price",
        size:100
    },
    {
        accessorKey: "qty",
        header: "QTY",
        size:100
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        size:100
    },
    {
        id: "actions",
        size:100,
        cell: (data) => <CellAction data={data.row.original} />
    }
];