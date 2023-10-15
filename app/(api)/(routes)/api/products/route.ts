import { formSchema } from "@/request/product-form-validate";
import AxiosService from "@/services/axiosService";
import ProductService from "@/services/product/product.service";
import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest, NextResponse } from "next/server";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponse | IResponseBase<IProductModel> | IResponseBase<IProductModel[]>>
) {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    try {
        switch (req.method) {
            case "GET":
                const payload = await sProduct.getProduct();
                return res.status(200).json({
                    success: true,
                    payload
                });
            case "POST":
                const body = formSchema.parse(req.body);
                return res.status(200).json(await sProduct.createProduct(body));
        }
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: JSON.parse(error.message),
            success: false
        }, { status: 200 }
        );
    }

}

export const GET = async (req: Request) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    try {
        const payload = await sProduct.getProduct();
        return NextResponse.json({
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
export const POST = async (req: Request) => {
    const sProduct: ProductService = new ProductService(AxiosService.getInstance());
    try {
        const body = formSchema.parse(await req.json());
        return NextResponse.json(await sProduct.createProduct(body));
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: JSON.parse(error.message),
            success: false
        }, { status: 200 }
        );
    }
};

