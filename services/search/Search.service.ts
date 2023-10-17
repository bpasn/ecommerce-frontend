import { Prisma } from "@prisma/client";
import { ISearch } from "./ISearch";
import prismadb from "@/lib/prismadb.util";
import { OptionSelect } from "@/components/input-form";

export default class SearchService implements ISearch {
    async get(model: Prisma.ModelName, value: string): Promise<OptionSelect[]> {
        const result = await prismadb.$queryRawUnsafe<OptionSelect[]>(`
        SELECT name , id as value FROM ${model} WHERE name LIKE '${value}%'
        `)
        return result;
    }

}