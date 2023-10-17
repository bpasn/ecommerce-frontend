import { OptionSelect } from "@/components/input-form";
import { Prisma } from "@prisma/client";

interface ISearch {
    get(model: Prisma.ModelName, value: string): Promise<OptionSelect[]>
}