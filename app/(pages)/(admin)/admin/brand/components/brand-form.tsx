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
import { Brand } from "@prisma/client";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { UseStoreAlert, useStoreAlert } from "@/hooks/useStoreAlert";
import { Alert, AlertDescription, AlertTitle, alertVariants } from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { useParams, useRouter } from "next/navigation";
import { wait } from "@/lib/utils";
import toast from "react-hot-toast";
import { ImageUpload } from "@/components/ui/image-upload";
import { BrandFormValues, brandFormSchema } from "@/request/brand-form-zod";


interface BrandFormProp {
  initialState: Brand | null;
};

const BrandForm: React.FC<BrandFormProp> = ({
  initialState
}) => {
  const [loading, setLoading] = useState(false);
  const storeAlert = useStoreAlert();

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: initialState || {
      name: "",
      image: ""
    }
  });
  const onSubmit = async (data: BrandFormValues) => {
    storeAlert.onHide();
    setLoading(true);
    try {
      let response;
      if (!initialState) {
        response = await axios.post<IResponse>("/api/brand", data);
      } else {
        response = await axios.patch<IResponse>(`/api/brand`, data, {
          params: initialState.id
        });
      }
      toast.success("Create brand success")
    } catch (error: any) {
      toast.success("[ ERROR ]: " + error.message)
    } finally {
      await wait(1.5 * 1000);
      window.location.href = "/admin/brand";
    }
  };
  const title = initialState ? "Edit Brand" : "Create Brand";
  const description = initialState ? "Update your Brand" : "Add new brand";
  return (
    <>
      <Heading title={title} description={description} />
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
                    <Input disabled={loading} placeholder="Brand label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <ImageUpload
                      pathFile="images/brand"
                      onChange={(img) => field.onChange(img)}
                      onRemove={(val) => field.onChange(val)}
                      value={field?.value as string}
                    />

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

export default BrandForm;