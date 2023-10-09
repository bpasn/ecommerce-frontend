'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { columns, BillboardColumns } from './columns';
import Heading from '@/components/ui/heading';
import ApiList from './api-list';

interface BillboardClientProps {
    data: BillboardColumns[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards(${data.length})`}
                    description='Billboards'
                />
                <Button onClick={() => router.push(`/admin/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='label' />
            <Separator />
            <Heading
                title='Api'
                description='API calls for Billboard'
            />
            <ApiList
                entityName={'Billboards'}
                entityIdName={"billboardId"}
            />
        </>
    );
};

export default BillboardClient;