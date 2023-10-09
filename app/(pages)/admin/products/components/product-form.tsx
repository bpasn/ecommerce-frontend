'use client';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Products } from "@prisma/client";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { UseStoreAlert, useStoreAlert } from "@/hooks/useStoreAlert";
import { Alert, AlertDescription, AlertTitle, alertVariants } from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { useParams, useRouter } from "next/navigation";
import { wait } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1),
});

export type ProductFormValues = z.infer<typeof formSchema>;


interface ProductFormProp {
  initalState: Products | null;
};
const variantMap: Record<UseStoreAlert['title'], VariantProps<typeof alertVariants>['variant']> = {
  "success": "success",
  "error": "error"
};
const ProductForm: React.FC<ProductFormProp> = ({
  initalState
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const storeAlert = useStoreAlert();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initalState || {
      name: "",
    }
  });
  const onSubmit = async (data: ProductFormValues) => {
    storeAlert.onHide();
    setLoading(true);
    try {
      let response;
      if (!initalState) {
        response = await axios.post<IResponse>("/api/products", data);
      } else {
        response = await axios.patch<IResponse>(`/api/products/${params.ProductId}`, data);
      }
      storeAlert.onShow("success", response.data.message);
    } catch (error: any) {
      storeAlert.onShow("error", error.message);
    } finally {
      await wait(1.5 * 1000);
      window.location.href = "/admin/products";
    }
  };
  const title = initalState ? "Edit Product" : "Create Product";
  const description = initalState ? "Update your Product" : "Add new Product";
  return (
    <>
      <Heading title={title} description={description} />
      {storeAlert.show && <Alert variant={variantMap[storeAlert.title]} >
        <AlertTitle>{storeAlert.title}</AlertTitle>
        <AlertDescription>
          {storeAlert.description}
        </AlertDescription>
      </Alert>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changed
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;