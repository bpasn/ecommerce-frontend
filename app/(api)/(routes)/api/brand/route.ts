import { brandFormSchema } from "@/request/brand-form-zod";
import BrandService from "@/services/brand/Brand.service";
import SubCategoriesService from "@/services/subCategory/SubCategories.service";
import { NextResponse } from "next/server"

export const POST = async (
    req: Request,
) => {
    const body = brandFormSchema.parse(await req.json());
    const sSubCate = new BrandService();
    try {
        const result = await sSubCate.create(body);
        return NextResponse.json<IResponse>(result)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success:false
        })
    }
}
export const PATH = async (
    req: Request,
) => {
    const url = new URL(req.url);
    const brandId = url.searchParams.get("brandId");
    const body = brandFormSchema.parse(await req.json());
    const sSubCate = new SubCategoriesService();
    try {
        const result = await sSubCate.update(brandId!,body);
        return NextResponse.json<IResponse>(result)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success:false
        })
    }
}
