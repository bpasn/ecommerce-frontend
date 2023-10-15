import { OrderCreate } from "@/src/pages/api/orders";
import { Orders, Products } from "@prisma/client";

interface IOrderCreate {
    quantity: number;
    product: Products;
}

interface IOrder {
    getAll(): Promise<IResponseBase<Orders[]>>;
    getById(id: string): Promise<IResponseBase<Orders>>;
    create(orders: OrderCreate): Promise<IResponse>;
}