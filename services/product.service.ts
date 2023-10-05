import AxiosService from "./axiosService";
export default class ProductService implements IProductService {
    private sAxios: AxiosService;
    constructor(sAxios: AxiosService) {
        this.sAxios = sAxios;
    }
    async getProduct(): Promise<IProductModel[]> {
        // const response = await this.sAxios.get<IProductModel[]>("https://fakestoreapi.com/products");
        return [];
    }
    async getProductById(id: string): Promise<IProductModel> {
        const response = await this.sAxios.get<IProductModel>(`https://fakestoreapi.com/products/${id}`);
        return response;
    }

}