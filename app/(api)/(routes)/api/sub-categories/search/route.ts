import prismadb from "@/lib/prismadb.util";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const searchParams = new URL(req.url).searchParams;
        const start = searchParams.get("start");
        const limit = searchParams.get("limit");

        const data = await prismadb.subCategory.findMany({
            skip: Number(start),
            take: Number(limit),
        });
        const count = await prismadb.subCategory.count();
        return NextResponse.json({
            count,
            data,
        });
    } catch (error) {
        return NextResponse.json({
            message: error,
            success: false
        });
    }
};