import {SubmitHandler, FieldValues , UseFormProps, useForm } from "react-hook-form";
import z, { ZodObject, ZodRawShape, ZodType, ZodTypeAny } from "zod";


export function createSchema<Fields extends ZodTypeAny>(zod: Fields) {
    return z.object({
        schema: zod
    });
}
type SchemaForm<T extends ZodType> = ReturnType<typeof createSchema<T>>;
export type schemaForm<T> = z.infer<SchemaForm<ZodType<T>>>;

type FormValues<T> = {
    [key: string]: T;
};
export interface IFormHook<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
  }
export const useFormHook = <T extends FormValues<any>, C = any>(init: UseFormProps<T, C>) => {
    const FormHook = useForm<T>(init);
    const { handleSubmit } = FormHook;

    return [FormHook, handleSubmit]
}