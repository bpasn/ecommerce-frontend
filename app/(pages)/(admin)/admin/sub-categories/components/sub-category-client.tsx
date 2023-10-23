'use client';
import { Button } from '@/components/ui/button';
import { DataTable, IDataTable } from '@/components/ui/data-table';
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
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(true);
    const [dataTable, setDataTable] = useState<IDataTable<SubCategoryColumns>>({
        count: 0,
        data: [],
        page: 0,
        pageSize: 20
    });

    const getDataTable = useCallback(async () => {
        setLoading(true);
        if (getData) {
            const result = await axios.get(
                `/api/sub-categories/search/`,
                {
                    params: {
                        limit: dataTable.pageSize,
                        page: dataTable.page,
                        categoryName: "",
                        subCategoryName: ""
                    }
                }
            );
            setLoading(false);
            setDataTable(prv => ({
                ...prv,
                data: result.data.data,
                count: result.data.count
            }));
        }
    }, [getData, dataTable]);
    useEffect(() => {
        if (getData) {
            console.log(dataTable);
            getDataTable();
        }
        return () => setGetData(false);
    }, [getData, dataTable]);
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
                setDataTable={setDataTable}
                columns={columns}
                loading={loading}
                dataTable={dataTable}
                onChangePageSize={() => setGetData(true)}
                onPaginationChange={() => setGetData(true)}
            />
        </>
    );
};

export default SubCategoryClient;