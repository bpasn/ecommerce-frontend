"use client";
import {
    Control,
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
import { cn } from "@/lib/utils";


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
    onChange?: React.ChangeEventHandler<HTMLInputElement>
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
                        <Input disabled={disabled} placeholder={placeholder} {...field} />
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
    options
}: SelectFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
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