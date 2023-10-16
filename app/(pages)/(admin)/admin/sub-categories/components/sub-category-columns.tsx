"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './sub-category-cell-action';

export interface SubCategoryColumns {
    id: string;
    name: string;
    categoryName: string;
    createdAt: string;
}

export const columns: ColumnDef<SubCategoryColumns>[] = [
    {
        accessorKey: "name",
        header: "name"
    },
    {
        accessorKey: "categoryName",
        header: "Category Name"
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