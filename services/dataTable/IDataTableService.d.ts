import { Prisma } from "@prisma/client";

interface IDataTableService {
    getData<TData>(TABLE: Prisma.ModelName, LIMIT: number, OFFSET: number): Promise<ResponseDataTable<TData>>;
}

interface ResponseDataTable<TData> {
    count: number;
    data: TData[];
}