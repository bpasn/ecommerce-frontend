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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Brand,
  ImageProduct,
  Products,
  SubCategory,
  feature,
  listFeature,
  productDescription
} from "@prisma/client";
import Heading from "@/components/ui/heading";
import axios from "axios";
import { useParams } from "next/navigation";
import { wait } from "@/lib/utils";
import { InputForm, OptionSelect, SearchSelectField, SelectField, TextareaForm } from "@/components/input-form";
import { ImageUpload } from "@/components/ui/image-upload";
import { formSchema } from "@/request/product-form-validate";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import prismadb from "@/lib/prismadb.util";



export type ProductFormValues = z.infer<typeof formSchema>;

export interface InitialStateFormProduct extends Products {
  images: ImageProduct[];
  description: productDescription & {
    feature: feature & {
      lists: listFeature[];
    };
  },
  brand: Brand,
  subCategory: SubCategory
}

export interface ProductFormProp {
  initialState: InitialStateFormProduct;
  categoryOption: OptionSelect[];
};

const ProductForm: React.FC<ProductFormProp> = ({
  initialState,
  categoryOption
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [valCategory, setValCategory] = useState<string>();
  const [valSubCategory, setValSubCategory] = useState<string>();
  const [optionCategory, setOptionCategory] = useState<OptionSelect[]>([]);
  const [optionSubCategory, setOptionSubCategory] = useState<OptionSelect[]>([]);
  const [optionBrand, setOptionBrand] = useState<OptionSelect[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState ? {
      ...initialState,
      price: parseFloat(String(initialState.price)),
      images: localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")!) : initialState.images,
    }
      : {
        name: "",
        title: "",
        brandId: "",
        categoryId: "",
        subCategoryId: "",
        price: Number(parseFloat(String(0.00)).toFixed(2)),
        qty: 0,
        sku: "",
        images: [],
        description: {
          feature: {
            title: "Feature Description",
            lists: []
          }
        }
      }
  });
  const { fields: fieldDesc, append: appendFieldDesc, remove: removeFieldDesc } = useFieldArray({
    control: form.control,
    name: "description.feature.lists"
  });

  const appendField = (text: string = "") => {
    appendFieldDesc({ text: text, });
  };
  const removeField = (index: number) => {
    removeFieldDesc(index);
  };
  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    try {
      let response;
      if (!initialState) {
        response = await axios.post<IResponse>("/api/products", data);
      } else {
        response = await axios.patch<IResponse>(`/api/products/${params?.productId}`, { ...data, price: Number(parseFloat(String(data.price))).toFixed(2) });
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

  const getResultDropdown = async (url: string, callback:(o:OptionSelect[]) => void) => {
    setLoading(true);
    try {
      const result = await axios.get<OptionSelect[]>(url);
      callback(result.data);
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }

  }


  const title = initialState ? "Edit Product" : "Create Product";
  const description = initialState ? "Update your Product" : "Add new Product";
console.log(valCategory)
  return (
    <>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      pathFile="images/products"
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
              name="name"
            />
            {/* title */}
            <InputForm
              control={form.control}
              formLabel="Product Title"
              name="title"
            />
            {/* select Category */}
            <SearchSelectField
              onClick={() => getResultDropdown("/api/categories?take=5",(o) => {
                setOptionCategory(o);
                setOptionSubCategory([]);
              })}
              control={form.control}
              formLabel={"Category Name"}
              placeholder="Choose your category name"
              name={"categoryId"}
              onSelectItem={(v: string) => setValCategory(v)}
              options={optionCategory}
              onInputChange={() => {
                
              }}
              inputPlaceholder={""} />
            {/* select Sub Category*/}
            <SearchSelectField
              onClick={() => getResultDropdown(`/api/sub-categories?take=5&categoriesId=${valCategory}`,(o) => setOptionSubCategory(o))}
              onSelectItem={(v: string) => setValSubCategory(v)}
              disabled={!valCategory || loading}
              control={form.control}
              formLabel={"Sub Category Name"}
              placeholder="Choose your sub category name"
              name={"subCategoryId"}
              options={optionSubCategory}
              onInputChange={() => { }}
              inputPlaceholder={""}
            />
            {/* select Brand */}
            <SearchSelectField
              onClick={() => getResultDropdown("/api/brand?take=5", (o) => setOptionBrand(o))}
              control={form.control}
              disabled={!valCategory || !valSubCategory || loading}
              formLabel={"Brand"}
              placeholder="Choose your Brand"
              name={"brandId"}
              options={optionBrand}
              onInputChange={() => { }}
              inputPlaceholder={""}
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
            <div className="flex flex-col col-span-1 md:col-span-4 gap-4">
              {fieldDesc.map((field, index) => {
                return (
                  <div key={field.id} className="grid grid-cols-4 items-end gap-3" >
                    <FormField
                      name={`description.feature.lists.${index}.text`}
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className="">
                            <FormLabel>List Feature : {index + 1}</FormLabel>
                            <FormControl>
                              <Input {...field} onChange={(e) => field.onChange(e)} disabled={loading} placeholder={"Please enter"} />
                            </FormControl>
                            <FormMessage />

                          </FormItem>
                        );
                      }}
                    />
                    <Button className="hover:bg-transparent" onClick={() => removeField(index)} size={"icon"} variant={"ghost"}>
                      <X />
                    </Button>
                  </div>

                );
              })}
              <Button variant={"link"} onClick={() => appendField()} size={"sm"} className="max-w-[150px]">Add Description</Button>
            </div>
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