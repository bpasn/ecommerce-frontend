import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/useOrigin';
import { useParams } from 'next/navigation';
import React from 'react';

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}
const ApiList: React.FC<ApiListProps> = ({
    entityIdName,
    entityName
}) => {
    const params = useParams();
    const origin = useOrigin();
    const baseurl = `${origin}/api/${params.storeId}`;
    return (
        <>
            <ApiAlert
                title={'GET'}
                description={`${baseurl}/${entityName}`}
                variant={'public'}
            />
            <ApiAlert
                title={'POST'}
                description={`${baseurl}/${entityIdName}`}
                variant={'admin'}
            />
        </>
    );
};

export default ApiList;