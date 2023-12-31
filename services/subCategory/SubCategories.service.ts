import { SubCategory } from "@prisma/client";
import { ISubCategories } from "./ISubCategories";
import prismadb from "@/lib/prismadb.util";
import { SubCategoryFormValues } from "@/request/subcategory-form-zod";
import { BrandFormValues } from "@/request/brand-form-zod";

export default class SubCategoriesService implements ISubCategories {

    async getByName(name: string): Promise<IResponseBase<SubCategory | null>> {
        return {
            success: true,
            payload: await prismadb.subCategory.findFirst({ where: { name }, orderBy: { createdAt: "desc" } })
        }
    }


    async getFirst(): Promise<IResponseBase<SubCategory | null>> {
        return {
            success: true,
            payload: await prismadb.subCategory.findFirst({ orderBy: { createdAt: "desc" } })
        }
    }
    async update(id: string, data: SubCategoryFormValues): Promise<IResponse> {
        await prismadb.subCategory.update({
            where: { id },
            data: data
        });
        return {
            message: "update sub category success",
            success: true
        }
    }
    async create(
        data: SubCategoryFormValues
    ): Promise<IResponse> {
        const {
            name,
            categoryId
        } = data
        await prismadb.subCategory.create({
            data: {
                categoryId,
                name
            }
        })
        return {
            message: "Create Sub category success",
            success: true
        }
    }

    async delete(id: string): Promise<void> {
        await prismadb.subCategory.delete({ where: { id } });
    }

    async get(take: number = 10, categoryId: string) {
        const result = await prismadb.subCategory.findMany({
            take: take,
            where:{categoryId}
        });
        return result.map(c => ({ name: c.name, value: c.id }));
    }



}