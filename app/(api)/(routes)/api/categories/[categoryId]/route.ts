import prismadb from "@/lib/prismadb.util";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string; }; }) {
    const body = await req.json();
    const cate = await prismadb.category.update({
        where: {
            id: params.categoryId
        },
        data: {
            name: body.name
        }
    });
    return NextResponse.json<IResponse>({
        message: "Update categories successfully.",
        success: true
    });
}

export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string; }; }
) {
    await prismadb.category.delete({
        where: {
            id: params.categoryId
        }
    });
    return NextResponse.json({
        message: "Delete categories successfully.",
        success: true
    });
}