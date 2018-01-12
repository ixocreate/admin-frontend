import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class ApiService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    private static handleResponse(response) {
        if (response.success === true) {
            return response.result;
        }
        throw new Error(response.errorCode);
    }

    private static handleError(error) {
        return Observable.throw(error);
    }

    constructor(protected http: HttpClient) {
    }

    protected get<T>(url: string, params: any = {}): Observable<T> {
        let httpParams = new HttpParams();
        for (const key of Object.keys(params)) {
            if (params[key] === null) {
                continue;
            }
            httpParams = httpParams.set(<string>key, <string>params[key]);
        }
        return this.http.get<ApiResponse<T>>(url, {headers: this.headers, params: httpParams})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }

    protected post<T>(url: string, params?: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(url, params, {headers: this.headers})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }

    protected put<T>(url: string, params?: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(url, params, {headers: this.headers})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }

    protected delete<T>(url: string, params: any = {}): Observable<T> {
        let httpParams = new HttpParams();
        for (const key of Object.keys(params)) {
            if (params[key] === null) {
                continue;
            }
            httpParams = httpParams.set(<string>key, <string>params[key]);
        }
        return this.http.delete<ApiResponse<T>>(url, {headers: this.headers, params: httpParams})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }
}

export interface ApiResponse<T> {
    success: boolean;
    errorCode: string;
    result: T;
}
