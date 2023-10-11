import AxiosService from "@/services/axiosService";
import { IFindByName } from "@/services/product/product";
import ProductService from "@/services/product/product.service";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest,
    { params }: { params: { productName: string; }; }) => {
    try {
        const sProduct = new ProductService(AxiosService.getInstance());
        return NextResponse.json<IFindByName[]>(await sProduct.findByName(params.productName), { status: 200 });
    } catch (error: any) {
        return NextResponse.json<IResponse>({
            message: error.message,
            success: false
        }, { status: 500 });
    }
};