import AxiosService from "@/services/axiosService";
import OrderService from "@/services/orders/order.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const sOrder: OrderService = new OrderService(AxiosService.getInstance());

    switch (req.method) {
        case "GET":
            res.json(await sOrder.getById(id?.toString()!));
            break;
    }
};