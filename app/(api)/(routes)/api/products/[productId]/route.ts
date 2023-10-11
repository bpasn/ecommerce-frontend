import { formSchema } from "@/request/product-form-validate";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product/product.service";
import { NextResponse, type NextRequest } from "next/server";
const sProduct: ProductService = new ProductService(AxiosService.getInstance());

export const PATCH = async (
    req: NextRequest,
    { params }: { params: { productId: string; }; }
) => {
    try {
        const body = formSchema.parse(await req.json());
        return NextResponse.json<IResponse>(await sProduct.updateProduct(params.productId, body), { status: 202 });
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: error.message,
            success: false
        }, { status: 500 });
    }
};