import { ProductFormValues } from "@/app/(pages)/admin/products/components/product-form";

interface IProductService {
   async getProduct(): Promise<IProductModel[]>;
   async getProductById(id: string): Promise<IProductModel>;
   async createProduct(product: ProductFormValues): Promise<IResponse>;
   async updateProduct(id: string, product: ProductFormValues): Promise<IResponse>;
   async findByName(productName: string): Promise<IFindByName[]>;
}

interface IFindByName {
   label:string;
   value:string;// id product
}