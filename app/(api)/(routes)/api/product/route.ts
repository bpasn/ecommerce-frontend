import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    const payload = await sProduct.getProduct()
    return NextResponse.json<IResponseBase<IProductModel[]>>(
        {
            success: true,
            method: req.method,
            payload: payload
        },
        { status: 200 }
    );
}
export const POST = (req: NextRequest) => {
    return NextResponse.json<IResponseBase<IProductModel[]>>(
        {
            success: true,
            method: req.method,
            payload: []
        },
        { status: 200 }
    );
}