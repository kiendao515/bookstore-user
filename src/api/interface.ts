export interface IBaseResponse<T = undefined> {
    result: boolean;
    data: T;
    reason: string;
}