'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { columns, CategoryColumns } from './columns';
import Heading from '@/components/ui/heading';
import ApiList from './api-list';

interface CategoryClientProps {
    data: CategoryColumns[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categorys(${data.length})`}
                    description='Categorys'
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='label' />
            <Separator />
            <Heading
                title='Api'
                description='API calls for Category'
            />
            <ApiList
                entityName={'Categorys'}
                entityIdName={"CategoryId"}
            />
        </>
    );
};

export default CategoryClient;