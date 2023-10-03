"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface CategoryColumns {
    id: string;
    label: string;
    createdAt: string;
}

export const columns: ColumnDef<CategoryColumns>[] = [
    {
        accessorKey: "label",
        header: "Label"
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