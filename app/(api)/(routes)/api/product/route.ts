import { authOption } from "@/lib/nextAuthOption";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    const payload = await sProduct.getProduct()
    const session = await getServerSession(authOption());
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