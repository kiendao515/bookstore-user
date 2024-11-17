export interface IBaseResponse<T = undefined> {
    success: boolean;
    data: T;
    message: string;
}