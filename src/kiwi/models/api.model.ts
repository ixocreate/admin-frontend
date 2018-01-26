export interface ApiResponse<T> {
    success: boolean;
    errorCode: string;
    result: T;
}

export interface LoginCredentials {
    username: string;
    password: string;
}
