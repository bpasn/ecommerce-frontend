import StoreModalForm from '@/components/modals/store-modal-forms'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import CategoryForm from './category-form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormHook } from '@/components/store-form';

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
}
const formSchema = z.object({
    name: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose
}) => {
    const title = "Create Category";

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            console.log(data);
        } catch (error) {
            toast.error("Opps someting wrong!")
        }
    };
    return (
        <></>
    )


}

export default ModalForm