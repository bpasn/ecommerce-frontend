"use client";

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './brand-cell-action';
import Image from 'next/image';

export interface BrandColumns {
    id: string;
    name: string;
    image: string;
}

export const columns: ColumnDef<BrandColumns>[] = [
    {
        accessorKey: "name",
        header: "name"
    },
    {
        accessorKey: "image",
        header:"Logo Brand",
        cell:({row}) => {
            return row.original.image ? (
                <Image src={row.original.image} alt='brand' width={50} height={50} className='object-contain'/>
            ) : "No Image"
        }
    },
   
    {
        id: "actions",
    
        cell: (data) => <CellAction data={data.row.original} />
    }
]