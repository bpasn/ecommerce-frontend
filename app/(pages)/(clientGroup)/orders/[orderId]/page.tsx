import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import prismadb from '@/lib/prismadb.util';
import Image from 'next/image';
import { formatter } from '@/lib/utils';
import { ArrowBigLeft, MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import OrdersClient from './components/order-client';
import { OrderColumns } from '@/app/(pages)/(admin)/admin/orders/components/columns';

const ProductPage = async ({
    params
}: { params: { orderId: string; }; }) => {
    const orders = await prismadb.orders.findFirst({
        where: { id: params.orderId },
        include: {
            orderItem: {
                include: {
                    product: {
                        include: {
                            images: true
                        }
                    }
                }
            }
        }
    });

    const formatData = orders?.orderItem.map(item => ({
        image: item.product.images[0].image,
        productId: item.product.id,
        orderId: orders.id,
        name: item.product.name,
        quantity: item.quantity.toString(),
        price: String(item.product.price.toFixed(2)),
        subtotal: formatter.format(+item.product.price * item.quantity)
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrdersClient data={formatData} />
            </div>
        </div>
    );
};

export default ProductPage;