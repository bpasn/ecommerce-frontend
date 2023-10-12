"use client";

import { ColumnDef, RowData } from '@tanstack/react-table';
import { CellAction } from './product-cell-action';


export interface ProductColumns {
    id: string;
    productName: string;
    categoryName: string;
    price: string;
    qty: string;
    description: string;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumns>[] = [
    {
        accessorKey: "productName",
        header: "Product Name",
        size: 170
    },
    {
        accessorKey: "categoryName",
        header: "Category Name",
        size: 200

    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "qty",
        header: "QTY"
    },
    {
        accessorKey: "description",
        header: "Description",
        size:250
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