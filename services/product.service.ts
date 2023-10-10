import { ProductFormValues } from "@/app/(pages)/admin/products/components/product-form";
import AxiosService from "./axiosService";
import prismadb from "@/lib/prismadb.util";
export default class ProductService implements IProductService {
    private sAxios: AxiosService;
    constructor(sAxios: AxiosService) {
        this.sAxios = sAxios;
    }
    async getProduct(): Promise<IProductModel[]> {
        // const response = await this.sAxios.get<IProductModel[]>("https://fakestoreapi.com/products");
        return [];
    }
    async getProductById(id: string): Promise<IProductModel> {
        const response = await this.sAxios.get<IProductModel>(`https://fakestoreapi.com/products/${id}`);
        return response;
    }

    async createProduct(products: ProductFormValues): Promise<IResponse> {
        const {
            productName,
            price,
            qty,
            sku,
            images,
            description,
            categoryId
        } = products;

        const product = await prismadb.products.create({
            data: {
                productName,
                price:price.toFixed(2),
                qty: parseInt(qty),
                sku: productName.substring(0, 4) + categoryId.substring(3, 6),
                description,
                categoryId
            }
        });
        const objectProductImage = images.map(img => ({ ...img, productId: product.id }));
        await prismadb.imageProduct.createMany({
            data: objectProductImage
        });

        return {
            message: "Create product successfully.",
            success: true,
        };

    }

}