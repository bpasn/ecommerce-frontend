interface IProductModel {
    id: string;
    name: string;
    category: string;
    oldPrice: number;
    description: string;
    images: string[];
    price: string;
    qty: number;
}

interface IStoreProduct extends IProductModel {
    quantity: number;
}