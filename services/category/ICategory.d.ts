import { Category } from "@prisma/client";

interface ICategory {
    getByName(name:string):Promise<SearchCategoryByName[]>;
    getAll():Promise<Category[]>
}

interface SearchCategoryByName {
    name: string;
    value: string;
  }