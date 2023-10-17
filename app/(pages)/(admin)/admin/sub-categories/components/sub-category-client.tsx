'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns, SubCategoryColumns } from './sub-category-columns';
import Heading from '@/components/ui/heading';

interface SubCategoryClientProps {
    data: SubCategoryColumns[];
}

const SubCategoryClient: React.FC<SubCategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`SubCategorys(${data.length})`}
                    description='SubCategorys'
                />
                <Button onClick={() => router.push(`/admin/sub-categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
            />
        </>
    );
};

export default SubCategoryClient;