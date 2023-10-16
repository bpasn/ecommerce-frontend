import { Brand, SubCategory } from "@prisma/client";
import { IBrand } from "./IBrand";
import prismadb from "@/lib/prismadb.util";
import { SubCategoryFormValues } from "@/request/subcategory-form-zod";
import { BrandFormValues } from "@/request/brand-form-zod";
import { OptionSelect } from "@/components/input-form";

export default class BrandService implements IBrand {
    async get(take: number): Promise<OptionSelect[]> {
        const result = await prismadb.brand.findMany({
            take
        });
        return result.map(b => ({ name: b.name, value: b.id }))
    }
    async getByName(name: string): Promise<IResponseBase<Brand | null>> {
        return {
            success: true,
            payload: await prismadb.brand.findFirst({ where: { name }, orderBy: { createdAt: "desc" } })
        }
    }


    async getFirst(): Promise<IResponseBase<Brand | null>> {
        return {
            success: true,
            payload: await prismadb.brand.findFirst({ orderBy: { createdAt: "desc" } })
        }
    }
    async update(id: string, data: BrandFormValues): Promise<IResponse> {
        await prismadb.brand.update({
            where: { id },
            data: data
        });
        return {
            message: "update sub category success",
            success: true
        }
    }
    async create(
        data: BrandFormValues
    ): Promise<IResponse> {
        await prismadb.brand.create({
            data: data
        })
        return {
            message: "Create Sub category success",
            success: true
        }
    }

    async delete(id: string): Promise<void> {
        await prismadb.subCategory.delete({ where: { id } });
    }



}