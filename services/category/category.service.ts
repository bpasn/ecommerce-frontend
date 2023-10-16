import prismadb from "@/lib/prismadb.util";
import { ICategory, SearchCategoryByName } from "./ICategory";
import { Category, Prisma } from "@prisma/client";

export default class CategoryService implements ICategory {
    async getByName(name: string): Promise<SearchCategoryByName[]> {
        const result = await prismadb.$queryRawUnsafe<SearchCategoryByName[]>(
            `SELECT name,id as value FROM Category WHERE name LIKE '%${name}%'`
        )
        return result;
    }
    async getAll(): Promise<Category[]> {
        return await prismadb.category.findMany({ orderBy: { createdAt: "desc" } })
    }

    async get(take: number = 10) {
        const result = await prismadb.category.findMany({
            take: take
        });
        return result.map(c => ({ name: c.name, value: c.id }));
    }

}