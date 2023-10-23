import prismadb from "@/lib/prismadb.util";
import { Prisma } from "@prisma/client";
import { IDataTableService, ResponseDataTable } from "./IDataTableService";

/**
 * T as Datacolumn modal
 */
export default class DataTableService implements IDataTableService {
    async getData<TData>(
        table: Prisma.ModelName,
        LIMIT: number,
        OFFSET: number
    ): Promise<ResponseDataTable<TData>> {
        const result = await prismadb.$queryRawUnsafe<TData[]>(
            `SELECT * FROM ? LIMIT ? OFFSET ? `,
            [
                LIMIT,
                OFFSET
            ]) as TData[];
        const count = await prismadb.$queryRaw<[{ count: number; }]>`SELECT COUNT(*) as count FROM ${table}`;
        return {
            data: result,
            count: count[0].count
        };
    }
}