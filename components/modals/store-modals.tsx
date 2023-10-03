"use client";
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';



const formSchema = z.object({
    name: z.string().min(1)
});

export const StoreModal = () => {

    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const result = await axios.post('/api/stores', values);
            toast.success("Create Store success. with name is :" + result.data.name);
            setTimeout(() => {
                window.location.assign(`/${result.data.id}`)
            },1.5 * 1000)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data)
            }
            toast.error("Something Went Wrong!!")
        } finally {
            setTimeout(() => {
                setLoading(false)
                storeModal.onClose()
            }, 1.5 * 1000);
        }
    }
    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 px-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='E-Commerce' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    disabled={loading}
                                    variant={"outline"}
                                    onClick={storeModal.onClose}
                                >Close</Button>
                                <Button disabled={loading} type='submit'>Continute</Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}