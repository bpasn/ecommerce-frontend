"use client";
import {
    Control,
    ControllerRenderProps,
    FieldPath,
    FieldValues
} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, wait } from "@/lib/utils";
import { ChangeEventHandler, SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";


export declare type UseControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName,
    control?: Control<TFieldValues>,

};
interface InputFormProps<T extends FieldValues> extends UseControllerProps<T> {
    formLabel: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
export function InputForm<T extends FieldValues>({
    formLabel,
    control,
    name,
    disabled = false,
    placeholder = "Please enter your " + name,
    onChange

}: InputFormProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <FormControl>
                        <Input {...field} onChange={(e) => field.onChange(e)} disabled={disabled} placeholder={placeholder} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
export function TextareaForm<T extends FieldValues>({
    formLabel,
    control,
    name,
    disabled = false,
    placeholder = "Please enter your " + name,
    className
}: InputFormProps<T> & {
    className?: string;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(className)}>
                    <FormLabel htmlFor={name}>{formLabel}</FormLabel>
                    <FormControl>
                        <Textarea disabled={disabled} placeholder={placeholder} id={name} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}


export interface OptionSelect {
    name: string;
    value: string;
}
interface SelectFieldProps<T extends FieldValues> extends InputFormProps<T> {
    options: OptionSelect[];
}
export function SelectField<T extends FieldValues>({
    formLabel,
    control,
    name,
    disabled = false,
    placeholder = "Please enter your " + name,
    options,
}: SelectFieldProps<T>) {
    return (
        <FormField

            control={control}
            name={name}
            render={({ field }) => (
                <FormItem >
                    <FormLabel>{formLabel}</FormLabel>
                    <Select
                        disabled={disabled}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger value={field.value} defaultValue={field.value} placeholder={placeholder}>
                                <SelectValue
                                    defaultValue={field.value}
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map(o => (
                                <SelectItem
                                    key={o.value}
                                    value={o.value}>
                                    {o.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}


const CancelToken = axios.CancelToken;
let cancel: any;
export enum API_SEARCH_INPUT {
    CATEGORIES = "categories",
    PRODUCTS = "products",
    SUB_CATEGORIES = "sub-categories",
    ORDERS = "orders",
    BRAND = "brand"
}
interface SearchSelectFieldProps<T extends FieldValues> extends InputFormProps<T> {
    onClick?: () => void;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputPlaceholder?: string;
    modelName: Prisma.ModelName;
    setStateOption: React.Dispatch<SetStateAction<OptionSelect[]>>;
    options: OptionSelect[];
}

export function SearchSelectField<T extends FieldValues>({
    formLabel,
    control,
    name,
    disabled = false,
    placeholder = "Please enter your " + name,
    inputPlaceholder = "Search input",
    options,
    onClick,
    setStateOption,
    modelName
}: SearchSelectFieldProps<T>) {
    const [inputSearch, setInputSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const callApi = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<OptionSelect[]>(`/api/search`, {
                params: {
                    model: modelName,
                    value: inputSearch
                },
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                })
            });
            setStateOption(response.data);
            setLoading(false);
        } catch (error: any) {
            if (axios.isCancel(error)) {
                return;
            }
            toast.error(error.message);
            setLoading(false);
        }
    }, [inputSearch])
    useEffect(() => {
        if (inputSearch.length >= 4) {
            if (cancel) {
                cancel();
            }
            callApi();
        }
    }, [inputSearch]);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                console.log(field.value)
                return (
                    <FormItem>
                        <FormLabel>{formLabel}</FormLabel>
                        <Select
                            onOpenChange={(e) => {
                                if (e) {
                                    onClick?.();
                                }
                            }}
    
                            disabled={disabled}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger value={field.value} defaultValue={field.value} placeholder={placeholder}>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder={placeholder}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent >
                                <div className="mb-2">
                                    <Input placeholder={inputPlaceholder} onChange={(e) => setInputSearch(e.target.value)} />
                                </div>
                                {options.length ? options.map((o: any) => (
                                    <SelectItem
                                        key={o.value}
                                        value={o.value}
                                        className="cursor-pointer"
                                    >
                                        {o.name}
                                    </SelectItem>
                                )) : (loading || disabled) ? "Loading..." : (
                                    <div className="p-2">No Result</div>
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
}