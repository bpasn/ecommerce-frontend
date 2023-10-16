import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    categoryId: z.string().min(1),
    subCategoryId: z.string().min(1),
    brandId: z.string().min(1),
    price: z.coerce.number().min(1),
    qty: z.coerce.number().min(1),
    sku: z.string(),
    description: z.object({
        feature: z.object({
            title: z.string().default("Feature Description"),
            lists: z.array(z.object({
                text: z.string().min(1)
            })).min(1)
        })
    }).nullable(),
    images: z.object({
        image: z.string()
    }).array().min(1)

});

/**
 * description: z.object({
        feature: z.object({
            title: z.string(),
            lists: z.array(
                z.object({
                    text: z.string()
                }))
        }).nullable()
        // functions: z.array(
        //     z.object({
        //         title: z.string(),
        //         lists: z.array(
        //             z.object({
        //                 text: z.string()
        //             }))
        //     })).nullable()
    }).nullable(),
 */