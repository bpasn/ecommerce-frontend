'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import {useRouter } from 'next/navigation';
import { columns, BrandColumns } from './brand-columns';
import Heading from '@/components/ui/heading';

interface BrandClientProps {
    data: BrandColumns[];
}

const BrandClient: React.FC<BrandClientProps> = ({
    data
}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Brands(${data.length})`}
                    description='Brands'
                />
                <Button onClick={() => router.push(`/admin/brand/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />
        </>
    );
};

export default BrandClient;