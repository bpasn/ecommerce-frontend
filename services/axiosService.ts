import { authOption } from "@/lib/nextAuthOption";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
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
        this.setToken();
    }

    static getInstance(): AxiosService {
        if (!AxiosService._instance) {
            AxiosService._instance = new AxiosService();

        }
        return AxiosService._instance;
    }
    async setToken() {
        let auth: string | undefined = this.axiosInstance.defaults.headers.common['Authorization']?.toString();
        if (!auth) {
            let session = await getServerSession(authOption());
            this.axiosInstance.defaults.headers.common['Authorization'] = session?.user?.accessToken;
        }
    }
    refreshToken(oldToken: string) {
        let newToken: string = "";
        // todo: logic refreshToken
        return newToken;
    }
    createToken() {
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