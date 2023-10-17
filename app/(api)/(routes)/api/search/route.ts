import { OptionSelect } from "@/components/input-form";
import SearchService from "@/services/search/Search.service";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
) => {
    const searchParams = new URL(req.url).searchParams;

    const model: Prisma.ModelName = searchParams.get("model") as Prisma.ModelName;
    const value = searchParams.get("value") || "";
    try {
        const sSearch = new SearchService();
        const payload = await sSearch.get(model, value);
        return NextResponse.json<OptionSelect[]>(payload, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}