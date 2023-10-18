'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns, SubCategoryColumns } from './sub-category-columns';
import Heading from '@/components/ui/heading';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface SubCategoryClientProps {
    data: SubCategoryColumns[];
}

const SubCategoryClient: React.FC<SubCategoryClientProps> = ({
    data
}) => {
    const router = useRouter();
    const effectCalled = useRef<boolean>(true);
    const effect = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState<{
        count: number;
        data: SubCategoryColumns[];
        page: number;
        start: number;
    }>({
        count: 0,
        data: [],
        page: 0,
        start: 0,
    });

    const getDataTable = async () => {
        setLoading(true);
        const result = await axios.get("/api/sub-categories/search/?start=0&limit=10");
        setLoading(false);
        setDataTable(prv => ({
            ...prv,
            data: result.data.data,
            count: result.data.count
        }));
        }
        useEffect(() => {
            getDataTable();
        }, []);
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
                    loading={loading}
                    countData={dataTable.count}
                    data={dataTable.data}
                    onPaginationChange={(page) => {
                        setDataTable(prv => ({ ...prv, page: page + 1 }));
                    }}
                />
            </>
        );
    };

    export default SubCategoryClient;