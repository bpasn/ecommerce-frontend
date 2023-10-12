import { ProductFormValues } from "@/app/(pages)/admin/products/components/product-form";
import AxiosService from "../axiosService";
import prismadb from "@/lib/prismadb.util";
import { IFindByName, IProductService } from "@/services/product/product";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/nextAuthOption";
import { Products } from "@prisma/client";
import { formatter } from "@/lib/utils";
export default class ProductService implements IProductService {
    private sAxios: AxiosService;
    constructor(sAxios: AxiosService) {
        this.sAxios = sAxios;
    }
    async findByName(productName: string): Promise<IFindByName[]> {
        const products = await prismadb.products.findMany({
            where: {
                productName: {
                    startsWith: productName
                }
            },
            select: {
                productName: true,
                id: true
            }
        });

        const mapperField: IFindByName[] = products.map(product => ({
            label: product.productName,
            value: product.id
        }));

        return mapperField;

    }


    async getProduct(): Promise<IProductModel[]> {
        // const response = await this.sAxios.get<IProductModel[]>("https://fakestoreapi.com/products");
        const products = await prismadb.products.findMany({
            include: {
                category: true,
                images: true
            }
        });
        const formatProducts: IProductModel[] = products.map((product) => {
            return ({
                id: product.id,
                name: product.productName,
                category: product.category.name,
                oldPrice: Number(product.price),
                description: product.description!,
                image: product.images[0].image,
                price: String(Number(product.price)),
                qty: product.qty
            });
        });
        return formatProducts;
    }
    async getProductById(id: string): Promise<IProductModel> {
        const response = await this.sAxios.get<IProductModel>(`https://fakestoreapi.com/products/${id}`);
        return response;
    }

    async createProduct(product: ProductFormValues): Promise<IResponse> {
        const {
            productName,
            price,
            qty,
            images,
            description,
            categoryId
        } = product;
        const _product = await prismadb.products.create({
            data: {
                productName,
                price: Number(parseFloat(String(price))).toFixed(2),
                qty: qty,
                sku: productName.substring(0, 4) + categoryId.substring(3, 6),
                description,
                categoryId
            }
        });
        const objectProductImage = images.map(img => ({ ...img, productId: _product.id }));
        await prismadb.imageProduct.createMany({
            data: objectProductImage
        });

        return {
            message: "Create product successfully.",
            success: true,
        };

    }

    async updateProduct(id: string, product: ProductFormValues): Promise<IResponse> {

        const {
            productName,
            price,
            qty,
            images,
            description,
            categoryId
        } = product;
        await prismadb.products.update({
            data: {
                productName,
                price,
                qty,
                description,
                categoryId,
                images: {
                    deleteMany: {}
                }
            },
            where: { id }
        });

        await prismadb.products.update({
            data: {
                images: {
                    createMany: {
                        data: [...images]
                    }
                }
            },
            where: { id: id }
        });
        return {
            message: "Update product success",
            success: true
        };
    }

}