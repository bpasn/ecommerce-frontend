import prismadb from '@/lib/prismadb.util'
import React from 'react'
import BillboardClient from '../componentx/client'

type Props = {}

const BillboardPage = async ({
    params
}: { params: { storeId: string } }) => {
    const billboaard = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient />
            </div>
        </div>
    )
}

export default BillboardPage