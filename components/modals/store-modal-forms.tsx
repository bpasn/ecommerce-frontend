'use client';
import React from 'react'
import Modal from '@/components/ui/modal';
import { Alert, AlertDescription, AlertTitle, alertVariants } from '@/components/ui/alert';
import { UseStoreAlert, useStoreAlert } from '@/hooks/useStoreAlert';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface StoreModalFormProps {
    title: string;
    body: JSX.Element | JSX.Element[] | React.ReactNode | string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    size?: "sm" | "md" | "lg"
}

const variantMap: Record<UseStoreAlert['title'], VariantProps<typeof alertVariants>['variant']> = {
    "success": "success",
    "error": "error"
}
const StoreModalForm: React.FC<StoreModalFormProps> = ({
    isOpen,
    onClose,
    body,
    title,
    description,
    size = "md"
}) => {
    const { show, title: alertTitle, description: alertDescription } = useStoreAlert();
    return (
        <Modal
            size={size}
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div >
                <div className="space-y-4 py-2 px-4 w-full">
                    {show && <Alert variant={variantMap[alertTitle]} >
                        <AlertTitle>{alertTitle}</AlertTitle>
                        <AlertDescription>
                            {alertDescription}
                        </AlertDescription>
                    </Alert>}
                    {body}
                </div>
            </div>
        </Modal>
    )
}

export default StoreModalForm