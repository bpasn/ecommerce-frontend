'use client';
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";

import Heading from "@/components/ui/heading";
import {
  InputForm,
  SearchSelectField
} from "@/components/input-form";
import { Category, SubCategory } from "@prisma/client";
import toast from "react-hot-toast";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { wait } from "@/lib/utils";
import { SearchCategoryByName } from "@/services/category/ICategory";
import {
  SubCategoryFormValues,
  subCategoryformSchema
} from "@/request/subcategory-form-zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface SubCategoryFormProp {
  initialState: SubCategory & {
    category: Category
  } | null;
};

const CancelToken = axios.CancelToken;
let cancel: any;
const SubCategoryForm: React.FC<SubCategoryFormProp> = ({
  initialState
}) => {
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [categories, setCategories] = useState<SearchCategoryByName[]>([]);
  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryformSchema),
    defaultValues: initialState || {
      name: "",
      categoryId: ""
    }
  });

  const onSubmit = async (data: SubCategoryFormValues) => {
    setLoading(true);
    try {
      let response;
      if (!initialState) {
        response = await axios.post<IResponse>("/api/sub-categories", data);
      } else {
        response = await axios.patch<IResponse>(`/api/sub-categories`, data, {
          params: {
            subCategoriesId: initialState.id
          }
        });
      }
      toast.success("Create categories success")
    } catch (error: any) {
      toast.success("[ ERROR ]: " + error.message)
    } finally {
      await wait(1.5 * 1000);
      window.location.href = "/admin/sub-categories";
    }
  };
  const title = initialState ? "Edit Sub Categories" : "Create Sub Categories";
  const description = initialState ? "Update your Sub categories" : "Add new sub categories";

  const searchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<{
        success: boolean,
        payload: SearchCategoryByName[]
      }>(`/api/categories/search/${valueSearch}`, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      });
      setCategories(response.data.payload)
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return;
      }
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }, [valueSearch])
  useEffect(() => {
    if (valueSearch.length >= 4) {
      if (cancel) {
        cancel()
      }
      searchCategory();
    }
  }, [valueSearch])

  useEffect(() => {
    if (initialState) {
      setCategories([{ value: initialState.category.id, name: initialState.category.name }])
    }
  }, [])
  return (
    <>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-4 gap-8">
            <InputForm
              control={form.control}
              name="name"
              formLabel="Sub Category Name"
            />
            <SearchSelectField
              api="sub-categories"
              setStateOption={setCategories}
              options={categories}
              control={form.control}
              disabled={loading}
              inputPlaceholder={"Search category by name"}
              formLabel={"Category Name"}
              name={"categoryId"} 
              onInputChange={(e) => setValueSearch(e.target.value) }            />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changed
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SubCategoryForm;