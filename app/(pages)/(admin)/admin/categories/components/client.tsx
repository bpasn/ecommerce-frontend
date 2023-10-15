'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { columns, CategoryColumns } from './category-columns';
import Heading from '@/components/ui/heading';
import ApiList from './api-list';
import { useStoreModal } from '@/hooks/useStoreModel';
import StoreModalForm from '@/components/modals/store-modal-forms';
import CategoryForm, { CategoryFormValues } from './category-form';
import toast from 'react-hot-toast';
import { useStoreAlert } from '@/hooks/useStoreAlert';
import Error from 'next/error';
import axios from 'axios';
import { useStoreModalForm } from '@/hooks/useStoreModalForm';

interface CategoryClientProps {
    data: CategoryColumns[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categorys(${data.length})`}
                    description='Categorys'
                />
                <Button onClick={() => router.push(`/admin/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />

            {/* <Separator />
            <Heading
                title='Api'
                description='API calls for Category'
            />
             {
                data.map(item => (
                    <ApiList
                    key={item.id}
                        entityName={'Categories'}
                        entityIdName={"CategoryId"}
                    />
                ))
            } */}
        </>
    );
};

export default CategoryClient;