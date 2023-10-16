import { ProductFormValues } from "@/app/(pages)/(admin)/admin/products/components/product-form";
import AxiosService from "../axiosService";
import prismadb from "@/lib/prismadb.util";
import { IFindByName, IProductService } from "@/services/product/product";
import _ from 'lodash';
export default class ProductService implements IProductService {
    private sAxios: AxiosService;
    constructor(sAxios: AxiosService) {
        this.sAxios = sAxios;
    }


    async getProductById(id: string): Promise<IProductModel> {
        const product = await prismadb.products.findFirst({
            where: { id },
            include: {
                images: true,
                category: true,
                description: {
                    include: {
                        feature: {
                            include: {
                                lists: true
                            }
                        },
                    }
                }
            }
        });
        if (_.isEmpty(product)) return {} as IProductModel;
        const mapper: IProductModel =
        {
            id: product?.id!,
            name: product?.name!,
            category: product?.category?.name!,
            oldPrice: Number(product?.price),
            description: product?.description!,
            images: product?.images?.map(e => e.image)!,
            price: String(Number(product?.price)),
            qty: product?.qty!
        };
        return mapper;
    }
    async findByName(productName: string): Promise<IFindByName[]> {
        const result = await prismadb.$queryRawUnsafe<IFindByName[]>(
            `SELECT name as label,id as value FROM Products WHERE name LIKE '%${productName}%'`,
        );
        return result;
    }


    async getProduct(): Promise<IProductModel[]> {
        // const response = await this.sAxios.get<IProductModel[]>("https://fakestoreapi.com/products");
        const products = await prismadb.products.findMany({
            include: {
                category: true,
                images: true,
                description: {
                    include: {
                        feature: {
                            include: {
                                lists: true
                            }
                        }
                    }
                }
            }
        });
        const formatProducts: IProductModel[] = products.map((product) => {
            return ({
                id: product.id,
                name: product.name,
                category: product.category.name,
                oldPrice: Number(product.price),
                description: product.description!,
                images: product.images.map(e => e.image),
                price: String(Number(product.price)),
                qty: product.qty
            });
        });
        return formatProducts || [];
    }

    async createProduct(product: ProductFormValues): Promise<IResponse> {
        const {
            name,
            price,
            brandId,
            title,
            qty,
            images,
            description,
            categoryId
        } = product;
        const _product = await prismadb.products.create({
            data: {
                name,
                brandId,
                title,
                price: Number(parseFloat(String(price))).toFixed(2),
                qty: qty,
                sku: name.substring(0, 4) + categoryId.substring(3, 6),
                description: {
                    create: {
                        feature: {
                            create: {
                                title: description?.feature.title!,
                                lists: {
                                    createMany: {
                                        data: [...description?.feature.lists!]
                                    }
                                }
                            }
                        }
                    }
                },
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
            name,
            price,
            title,
            qty,
            images,
            description,
            categoryId
        } = product;
        const _product = await prismadb.products.update({
            data: {
                name,
                price,
                qty,
                categoryId,
                images: {
                    deleteMany: {}
                },
                description: {
                    delete: { feature: { lists: {} } }
                }
            },
            where: { id },
            include: { description: { include: { feature: { include: { lists: true } } } } }
        });

        await prismadb.products.update({
            data: {
                description: {
                    create: {
                        feature: {
                            create: {
                                title,
                                lists: {
                                    createMany: {
                                        data: [...description?.feature.lists!]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: {
                id
            }
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