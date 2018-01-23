import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiResponse} from '../models';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export abstract class ApiService {

    /**
     * handle kiwi admin api responses
     * @param response
     */
    private static handleResponse(response) {
        if (response.success === true) {
            return response.result;
        }
        throw new Error(response.errorCode);
    }

    /**
     * handle kiwi admin api error responses
     * @param error
     * @returns {ErrorObservable}
     */
    static handleError(error) {
        // todo: send forward to global error handler service
        return Observable.throw(error);
    }

    constructor(protected http: HttpClient) {
    }

    protected get<T>(url: string, params: any = {}): Observable<T> {
        let httpParams = new HttpParams();
        /**
         * omit empty params
         */
        for (const key of Object.keys(params)) {
            if (params[key] === null) {
                continue;
            }
            httpParams = httpParams.set(<string>key, <string>params[key]);
        }
        return this.http.get(url, {params: httpParams})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }

    protected post<T>(url: string, params?: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(url, params, {})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }

    protected put<T>(url: string, params?: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(url, params, {})
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
        return this.http.delete<ApiResponse<T>>(url, {params: httpParams})
            .map(ApiService.handleResponse)
            .catch(ApiService.handleError);
    }
}
