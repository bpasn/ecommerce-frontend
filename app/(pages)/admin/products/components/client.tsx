'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import {  useRouter } from 'next/navigation';
import React from 'react';
import { columns, ProductColumns } from './columns';
import Heading from '@/components/ui/heading';

interface ProductClientProps {
    data: ProductColumns[];
}

const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products(${data.length})`}
                    description='Products'
                />
                <Button onClick={() => router.push(`/admin/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />

            {/* <Separator />
            <Heading
                title='Api'
                description='API calls for Product'
            />
             {
                data.map(item => (
                    <ApiList
                    key={item.id}
                        entityName={'Categories'}
                        entityIdName={"ProductId"}
                    />
                ))
            } */}
        </>
    );
};

export default ProductClient;