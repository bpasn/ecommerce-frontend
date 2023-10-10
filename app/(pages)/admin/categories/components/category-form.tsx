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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import AlertModal from "@/components/modals/alert-modal";
import { IFormHook } from "@/components/store-form";
import { Category } from "@prisma/client";
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

export type CategoryFormValues = z.infer<typeof formSchema>;


interface CategoryFormProp {
  initialState: Category | null;
};
const variantMap: Record<UseStoreAlert['title'], VariantProps<typeof alertVariants>['variant']> = {
  "success": "success",
  "error": "error"
};
const CategoryForm: React.FC<CategoryFormProp> = ({
  initialState
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const storeAlert = useStoreAlert();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState || {
      name: "",
    }
  });
  const onSubmit = async (data: CategoryFormValues) => {
    storeAlert.onHide();
    setLoading(true);
    try {
      let response;
      if (!initialState) {
        response = await axios.post<IResponse>("/api/categories", data);
      } else {
        response = await axios.patch<IResponse>(`/api/categories/${params.categoryId}`, data);
      }
      storeAlert.onShow("success", response.data.message);
    } catch (error: any) {
      storeAlert.onShow("error", error.message);
    } finally {
      await wait(1.5 * 1000);
      window.location.href = "/admin/categories";
    }
  };
  const title = initialState ? "Edit Categories" : "Create Categories";
  const description = initialState ? "Update your Categories" : "Add new categories";
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
                    <Input disabled={loading} placeholder="Category label" {...field} />
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

export default CategoryForm;