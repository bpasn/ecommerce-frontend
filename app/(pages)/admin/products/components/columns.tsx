"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface ProductColumns {
    id: string;
    name: string;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumns>[] = [
    {
        accessorKey: "name",
        header: "name"
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