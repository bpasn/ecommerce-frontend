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
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import AlertModal from "@/components/modals/alert-modal";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
});

type BillboardFormValues = z.infer<typeof formSchema>;


interface BillboardFormProp {
  initialData: Billboard | null;
};
const BillboardForm: React.FC<BillboardFormProp> = ({
  initialData
}) => {
  const [open, setOpen] = useState(false);// alert modal;
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: ""
    }
  });

  const onSubmit = async (data: BillboardFormValues) => {
    console.log(data);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(!open)}
        onConfirm={() => { }}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description="Manage billboards preferences" />
        {initialData && (
          <Button
            variant="danger"
            size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grdi grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImageUrl</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboad" {...field} />
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

export default BillboardForm;