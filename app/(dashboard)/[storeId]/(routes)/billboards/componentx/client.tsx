import { Button } from '@/components/ui/button'
import { Heading, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const BillboardClient = (props: Props) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <div>this will be the Heading</div>
                <Button onClick={() => router.push(`/${params.storeId}`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
        </>
    )
}

export default BillboardClient