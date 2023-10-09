import prismadb from "@/lib/prismadb.util";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1)
});
type requestBody = z.infer<typeof schema>;
export async function POST(req: NextRequest){
    const body: requestBody = req.body as unknown as requestBody;
    console.log(body)
    const validateSchema = schema.safeParse(req.body);
    if (!validateSchema.success) {
        return NextResponse.json<IResponse>({
            message: validateSchema.error.toString(),
            method: req.method,
            success: false
        }, { status: 400 });
    }
    await prismadb.category.create({
        data: {
            name: body.name
        }
    })
    return NextResponse.json<IResponse>({
        message: "Create categories success",
        method: req.method,
        success: true
    })
}