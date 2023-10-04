interface IResponseBase<T> {
    success: boolean;
    payload: T;
    method: string;
}
interface IResponse{
    success:boolean;
    method:string;
    message:string
}