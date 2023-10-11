import { authOption } from "@/lib/nextAuthOption";
import { formSchema } from "@/request/product-form-validate";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product.service";
import { Products } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    const payload = await sProduct.getProduct();
    return NextResponse.json<IResponseBase<Products[]>>(
        {
            success: true,
            method: req.method,
            payload: payload
        },
        { status: 200 }
    );
};

export const POST = async (req: NextRequest) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    try {
        const body = formSchema.parse(await req.json());
        console.log({ body });
        return NextResponse.json<IResponse>(await sProduct.createProduct(body), { status: 200 });
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: JSON.parse(error.message),
            success: false
        }, { status: 200 }
        );
    }
};


