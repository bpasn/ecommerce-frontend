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

const formSchema = z.object({
  name: z.string().min(1),
});

export type CategoryFormValues = z.infer<typeof formSchema>;


interface CategoryFormProp extends IFormHook<CategoryFormValues> {
};
const CategoryForm: React.FC<CategoryFormProp> = ({
  onSubmit
}) => {
  const [open, setOpen] = useState(false);// alert modal;
  const [loading, setLoading] = useState(false);

  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  return (
    <>
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