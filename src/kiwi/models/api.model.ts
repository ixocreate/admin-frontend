export interface ApiResponse<T> {
    success: boolean;
    errorCode: string;
    result: T;
}
