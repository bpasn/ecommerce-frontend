import AxiosService from "@/services/axiosService";
import OrderService from "@/services/orders/order.service";
import { Orders } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const validate = z.object({
    orderItem: z.object({
        productId: z.string(),
        quantity: z.number(),
    }).array(),
    total: z.coerce.number().min(1)
});

export type OrderCreate = z.infer<typeof validate>;
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponse | IResponseBase<Orders> | IResponseBase<Orders[]>>
) {
    const sOrder: OrderService = new OrderService(AxiosService.getInstance());
    switch (req.method) {
        case "GET":

            break;
        case "POST":
            const orderCreate = validate.parse(req.body);
            res.status(201).json(await sOrder.create(orderCreate));
            break;

    }
}