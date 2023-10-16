import { OptionSelect } from "@/components/input-form";
import { BrandFormValues } from "@/request/brand-form-zod";
import { Brand, SubCategory } from "@prisma/client";

interface IBrand {
    create(data: BrandFormValues): Promise<IResponse>;
    update(id: string, data: BrandFormValues): Promise<IResponse>;
    delete(id: string): Promise<void>;
    get(take: number): Promise<OptionSelect[]>;
    getByName(name: string): Promise<IResponseBase<Brand?>>;
    getFirst(): Promise<IResponseBase<Brand?>>;
}