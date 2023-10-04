import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// we called this is a singleton;
export default class AxiosService {
    private static _instance: AxiosService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        // Initialize Axios with any default configuration your need;
        this.axiosInstance = axios.create({
            baseURL: process.env.APP_API,
            timeout: 5 * 1000//set your desired timeout
        });
    }

    static getInstance(): AxiosService {
        if (!AxiosService._instance) {
            AxiosService._instance = new AxiosService();
        }
        return AxiosService._instance;
    }
    setToken(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    createToken(){
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config,);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}