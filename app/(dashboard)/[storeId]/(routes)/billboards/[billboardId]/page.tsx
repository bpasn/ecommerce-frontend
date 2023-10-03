import prismadb from '@/lib/prismadb.util'
import React from 'react'

type Props = {}

const BillboardPage = async ({
    params
}: { params: { billboardId: string } }) => {
    const billboaard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
    return (
        <div>BillboardPage</div>
    )
}

export default BillboardPage