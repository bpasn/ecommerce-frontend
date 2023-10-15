"use client";

import { ColumnDef, RowData } from '@tanstack/react-table';
import { CellAction } from './order-cell-action';
import Link from 'next/link';
import Image from 'next/image';


export interface OrdersColumns {
    image: string;
    productId: string;
    productName:string;
    orderId: string;
    quantity: string;
    price: string;
    subtotal: string;
}

export const columns: ColumnDef<OrdersColumns>[] = [
    {
        accessorKey: "item",
        cell({ row: { original } }) {
            return (
                <>
                    <Link href={`/product/${original.productId}?redirect=/order/${original.orderId}`} className="flex items-center">
                        <Image
                            src={original.image}
                            alt={original.productName}
                            width={50}
                            height={50}
                        />
                        &nbsp;
                        {original.productName}
                    </Link>
                </>
            );
        },
    },
    {
        accessorKey: "quantity",
        header: "QTY",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "subtotal",
        header: "Subtotal",
    }
];