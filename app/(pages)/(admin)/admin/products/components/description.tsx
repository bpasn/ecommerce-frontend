'use client';
import { InputForm, UseControllerProps } from '@/components/input-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formSchema } from '@/request/product-form-validate';
import React, { ChangeEventHandler, useState } from 'react';
import { Control, FieldValue, FieldValues, useFieldArray } from 'react-hook-form';

interface DescriptionProductProps<T extends FieldValues> extends UseControllerProps<T> {

}

const DescriptionProduct = <T extends FieldValues>({
    control,
}: DescriptionProductProps<T>) => {
    const [descTitle, setDescTitle] = useState<{
        title: React.JSX.Element;
        lists: React.JSX.Element[];
    }[]>([]);
    const [descList, setDescList] = useState<React.JSX.Element[]>([]);
    const inputRef = React.createRef<HTMLInputElement>() as any;

    const generateSessionDescription = () => {
        const _element: React.JSX.Element = (
            <div className={
                cn("flex flex-row gap-4")
            }>
                <InputForm control={control as unknown as Control<typeof formSchema>} formLabel={'Title'} name={"_type.description.feature.title"} />
                <Button onClick={() => generateList()}>add feature</Button>
            </div>
        );
        setDescTitle(prv => [...prv, {
            title: _element,
            lists: []
        }]);
    };
    const generateList = () => {
        const _element: React.JSX.Element = (
            <div className={
                cn("flex flex-row gap-4")
            }>
                <InputForm control={control as unknown as Control<typeof formSchema>} formLabel={'Feature'} name={"_type.description.feature.lists"} />
            </div>
        );
    };
    return (
        <div className='flex gap-4 flex-col'>
            <Button onClick={() => generateSessionDescription()}>Add Description</Button>
            <div className="flex flex-col gap-3">
                {descTitle}
            </div>
        </div>
    );
};
export default DescriptionProduct;