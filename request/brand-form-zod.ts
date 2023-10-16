import {z} from "zod";

export const brandFormSchema = z.object({
    name: z.string().min(1),
    image: z.string().nullable()
  });
  
  export type BrandFormValues = z.infer<typeof brandFormSchema>;
  
  