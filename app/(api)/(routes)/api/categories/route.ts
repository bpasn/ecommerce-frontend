import prismadb from "@/lib/prismadb.util";
import CategoryService from "@/services/category/category.service";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1),
    id: z.string().optional()
});
type requestBody = z.infer<typeof schema>;

export async function GET(req: Request) {
    try {

        const url = new URL(req.url);
        const take = url.searchParams.get("take");
        const sCate = new CategoryService();
        const result = await sCate.get(Number(take));
        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}
export async function POST(req: Request) {
    const body: requestBody = await req.json();
    const validateSchema = schema.safeParse(body);
    if (!validateSchema.success) {
        return NextResponse.json<IResponse>({
            message: validateSchema.error.toString(),
            success: false
        }, { status: 400 });
    }
    await prismadb.category.create({
        data: {
            name: body.name
        }
    });
    return NextResponse.json<IResponse>({
        message: "Create categories success",
        success: true
    });
}

export async function PATCH(req: Request) {
    const body = await req.json();

    await prismadb.category.update({
        where: { id: body.id },
        data: { name: body.name }
    });
    return NextResponse.json<IResponse>({
        message: "Update categories success",
        success: true
    });
}
