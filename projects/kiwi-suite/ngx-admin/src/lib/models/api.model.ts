export interface ApiResponse<T> {
    success: boolean;
    errorCode: string;
    result: T;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ResourceListModel {
    label: string;
    items: Array<any>;
    schema: Array<any>;
    meta: Array<any>;
}

export interface ResourceModel {
    label: string;
    item: Array<any>;
    schema: Array<any>;
    meta: Array<any>;
}
