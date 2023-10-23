import prismadb from "@/lib/prismadb.util";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const searchParams = new URL(req.url).searchParams;
        const page = searchParams.get("page");
        const limit = searchParams.get("limit");
        const categoryName = searchParams.get("categoryName");
        const subCategoryName = searchParams.get("categoryName");
        let optionWhere: Prisma.SubCategoryFindManyArgs<DefaultArgs> = {};
        optionWhere.skip = Number(page) * Number(limit);
        optionWhere.take = (Number(page) + 1) * Number(limit);
        if (categoryName) {
            optionWhere = {
                ...optionWhere,
                where: {
                    ...optionWhere.where,
                    category: {
                        name: categoryName
                    }
                }
            };
        }
        if (subCategoryName) {
            optionWhere = {
                ...optionWhere,
                where: {
                    ...optionWhere.where,
                    name: subCategoryName
                }
            };
        }
        const data = await prismadb.subCategory.findMany({
            ...optionWhere,
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