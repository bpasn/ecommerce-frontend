import { z } from "zod";

export const formSchema = z.object({
    orderName: z.string().min(1),
    categoryId: z.string().min(1),
    price: z.coerce.number().min(1),
    qty: z.coerce.number().min(1),
    sku: z.string(),
    description: z.string().nullable(),
    images: z.object({
        image: z.string()
    }).array().min(1)

});