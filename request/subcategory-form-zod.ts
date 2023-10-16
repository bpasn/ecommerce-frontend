import { z } from "zod";

export const subCategoryformSchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1)
});

export type SubCategoryFormValues = z.infer<typeof subCategoryformSchema>;

