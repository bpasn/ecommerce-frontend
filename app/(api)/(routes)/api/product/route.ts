import { ProductFormValues } from "@/app/(pages)/admin/products/components/product-form";
import { authOption } from "@/lib/nextAuthOption";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const sProduct: ProductService = new ProductService(AxiosService.getInstance());
export const GET = async (req: NextRequest) => {
    const payload = await sProduct.getProduct();
    const session = await getServerSession(authOption());
    return NextResponse.json<IResponseBase<IProductModel[]>>(
        {
            success: true,
            method: req.method,
            payload: payload
        },
        { status: 200 }
    );
};
export const POST = async (req: Request) => {
    const body: ProductFormValues = await req.json();
    return NextResponse.json<IResponse>(await sProduct.createProduct(body),{ status: 200 }
    );
};