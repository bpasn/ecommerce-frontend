interface IResponseBase<T> {
    success: boolean;
    payload: T;
}
interface IResponse{
    success:boolean;
    message:any
}
