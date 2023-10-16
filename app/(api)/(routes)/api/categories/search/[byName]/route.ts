import CategoryService from "@/services/category/category.service"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    { params }: { params: { byName: string } }) => {
    const sCategory = new CategoryService();
    try {
        const category = await sCategory.getByName(params.byName);
        return NextResponse.json({
            success: true,
            payload: category
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}