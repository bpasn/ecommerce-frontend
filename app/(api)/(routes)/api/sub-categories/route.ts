import { subCategoryformSchema } from "@/request/subcategory-form-zod";
import SubCategoriesService from "@/services/subCategory/SubCategories.service";
import { NextResponse } from "next/server"

export const POST = async (
    req: Request,
) => {
    const body = subCategoryformSchema.parse(await req.json());
    const sSubCate = new SubCategoriesService();
    try {
        const result = await sSubCate.create(body);
        return NextResponse.json<IResponse>(result)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}
export const PATCH = async (
    req: Request,
) => {
    const url = new URL(req.url)

    const subCategoriesId = url.searchParams.get("subCategoriesId")
    console.log({subCategoriesId})
    const body = subCategoryformSchema.parse(await req.json());
    const sSubCate = new SubCategoriesService();
    try {
        const result = await sSubCate.update(subCategoriesId!, body);
        return NextResponse.json<IResponse>(result)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}
