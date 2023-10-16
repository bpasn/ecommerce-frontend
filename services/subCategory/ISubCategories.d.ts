import { SubCategory } from "@prisma/client";

interface ISubCategories {
    create(data: SubCategoryFormValues): Promise<IResponse>;
    update(id: string, data: SubCategoryFormValues): Promise<IResponse>;
    delete(id: string): Promise<void>;
    getByName(name:string):Promise<IResponseBase<SubCategory?>>;
    getFirst():Promise<IResponseBase<SubCategory?>>;
}