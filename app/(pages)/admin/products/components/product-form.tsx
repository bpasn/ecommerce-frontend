'use client';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ImageProduct, Products } from "@prisma/client";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { UseStoreAlert, useStoreAlert } from "@/hooks/useStoreAlert";
import { Alert, AlertDescription, AlertTitle, alertVariants } from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { useParams } from "next/navigation";
import { cn, wait } from "@/lib/utils";
import { InputForm, OptionSelect, SelectField, TextareaForm } from "@/components/input-form";
import { ImageUpload } from "@/components/ui/image-upload";
import { formSchema } from "@/request/product-form-validate";
import toast from "react-hot-toast";



export type ProductFormValues = z.infer<typeof formSchema>;
interface ProductFormProp {
  initialState: Products & {
    images: ImageProduct[];
  } | null;
  categoryOption: OptionSelect[];
};
const variantMap: Record<UseStoreAlert['title'], VariantProps<typeof alertVariants>['variant']> = {
  "success": "success",
  "error": "error"
};
const ProductForm: React.FC<ProductFormProp> = ({
  initialState,
  categoryOption
}) => {
  const params = useParams();
  console.log(params);
  const [loading, setLoading] = useState(false);
  const storeAlert = useStoreAlert();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState ? {
      ...initialState,
      price: parseFloat(String(initialState.price)),
      images: localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")!) : initialState.images,
    }
      : {
        productName: "",
        categoryId: "",
        description: "",
        price: Number(parseFloat(String(0.00)).toFixed(2)),
        qty: 0,
        sku: "",
        images: []

      }
  });
  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    try {
      let response;
      if (!initialState) {
        response = await axios.post<IResponse>("/api/products", data);
      } else {
        response = await axios.patch<IResponse>(`/api/products/${params.productId}`, data);
      }
      toast.success("success", response.data.message);
      await wait(1.5 * 1000);
      window.location.href = "/admin/products";
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(error.message);
    } finally {
      localStorage.removeItem("images");
      localStorage.removeItem("uuid");
    }
  };
  const title = initialState ? "Edit Product" : "Create Product";
  const description = initialState ? "Update your Product" : "Add new Product";
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
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => {
              console.log(field.value);
              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map(img => img.image)}
                      onChange={(image) => {
                        field.value = [...field.value, { image }];
                        return field.onChange(field.value);
                      }}
                      onRemove={(image) => field.onChange(field.value.filter(img => img.image != image))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Product Name */}
            <InputForm
              control={form.control}
              formLabel="Product Name"
              name="productName"
            />
            {/* select */}
            <SelectField
              control={form.control}
              formLabel={"Category Name"}
              placeholder="Choose your category name"
              name={"categoryId"}
              options={categoryOption}
            />

            {/* Price */}
            <InputForm
              control={form.control}
              formLabel="Price"
              name="price"
            />
            {/* QTY */}
            <InputForm
              control={form.control}
              formLabel="QTY"
              name="qty"
            />
            {/* Description */}
            <TextareaForm
              control={form.control}
              formLabel="Description"
              name="description"
              className={cn("sm:col-span-2 md:col-span-3 col-span-1")}
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