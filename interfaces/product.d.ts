interface IProductService {
   async getProduct(): Promise<IProductModel[]>;
   async getProductById(id:string):Promise<IProductModel>;
}