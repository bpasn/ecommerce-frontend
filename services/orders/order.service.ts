import { OrderItem, Orders } from "@prisma/client";
import AxiosService from "../axiosService";
import { IOrder, IOrderCreate } from "./order";
import prismadb from "@/lib/prismadb.util";
import { OrderCreate } from "@/src/pages/api/orders";

export default class OrderService implements IOrder {
    private sAxios: AxiosService;
    constructor(sAxios: AxiosService) {
        this.sAxios = sAxios;
    }
    async getAll(): Promise<IResponseBase<Orders[]>> {
        const orders = await prismadb.orders.findMany({ orderBy: { createdAt: "desc" } });
        return {
            success: true,
            payload: orders
        };
    }
    async getById(id: string): Promise<IResponseBase<Orders>> {
        const orders = await prismadb.orders.findFirstOrThrow({
            where: { id },
            include: {
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return {
            success: true,
            payload: orders
        };
    }
    async create(orders: OrderCreate): Promise<IResponse> {
        await prismadb.orders.create({
            data: {
                total: Number(parseFloat(String(orders.total)).toFixed(2)),
                orderItem: {
                    createMany: {
                        data: orders.orderItem
                    }
                }
            }
        });
        return {
            message: "create order success",
            success: true
        };
    }
}