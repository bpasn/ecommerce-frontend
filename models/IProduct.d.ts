interface IProductModel {
    id: string;
    name: string;
    title?:string;
    category: string;
    oldPrice: number;
    description: IProductDescription;
    images: string[];
    price: string;
    qty: number;
}

interface IProductDescription {
    feature:{
        title:string;
        lists: {
            text:string;
        }[]
    }
}

interface IStoreProduct extends IProductModel {
    quantity: number;
}