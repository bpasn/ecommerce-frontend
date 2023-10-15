import { formSchema } from "@/request/product-form-validate";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product/product.service";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";


export const GET = async (
    req: Request,
    { params }: { params: { productId: string; }; }
) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    const { productId } = params;
    try {
        const payload = await sProduct.getProductById(productId);
        return NextResponse.json<IResponseBase<IProductModel>>({
            success: true,
            payload
        });
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: JSON.parse(error.message),
            success: false
        }, { status: 200 }
        );
    }
};
export const PATCH = async (
    req: Request,
    { params }: { params: { productId: string; }; }
) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    const { productId } = params;

    try {
        let body = await req.json();
        body = formSchema.parse({ ...body});
        return NextResponse.json(await sProduct.updateProduct(productId?.toString()!, body));
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 200 }
        );
    }
};
