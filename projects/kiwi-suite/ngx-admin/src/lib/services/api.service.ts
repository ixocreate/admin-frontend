import {HttpClient, HttpParams} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiResponse} from '../models';
import {LoggerService} from './logger.service';

export class ApiService {

    protected _loading$ = new BehaviorSubject<boolean>(false);

    constructor(protected http: HttpClient, public logger: LoggerService) {
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    /**
     * handle kiwi admin api responses
     * @param response
     */
    private handleResponse(response) {
        if (this._loading$) {
            this._loading$.next(false);
        }
        if (response.success === true) {
            return response.result;
        }
        throw new Error(response.errorCode);
    }

    /**
     * handle kiwi admin api error responses
     * @param error
     */
    private handleError(error) {
        if (this._loading$) {
            this._loading$.next(false);
        }
        return observableThrowError(error);
    }

    get<T>(url: string, params: any = {}): Observable<T> {

        this._loading$.next(true);

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
        return this.http.get(url, {params: httpParams}).pipe(
            map(response => this.handleResponse(response)),
            catchError(error => this.handleError(error))
        );
    }

    post<T>(url: string, params?: any): Observable<T> {
        this._loading$.next(true);
        return this.http.post<ApiResponse<T>>(url, params, {}).pipe(
            map(response => this.handleResponse(response)),
            catchError(error => this.handleError(error))
        );
    }

    put<T>(url: string, params?: any): Observable<T> {
        this._loading$.next(true);
        return this.http.put<ApiResponse<T>>(url, params, {}).pipe(
            map(response => this.handleResponse(response)),
            catchError(error => this.handleError(error))
        );
    }

    patch<T>(url: string, params?: any): Observable<{}> {
        this._loading$.next(true);
        return this.http.patch<ApiResponse<T>>(url, params, {}).pipe(
            map(response => this.handleResponse(response)),
            catchError(error => this.handleError(error))
        );
    }

    delete<T>(url: string, params: any = {}): Observable<T> {
        this._loading$.next(true);
        let httpParams = new HttpParams();
        for (const key of Object.keys(params)) {
            if (params[key] === null) {
                continue;
            }
            httpParams = httpParams.set(<string>key, <string>params[key]);
        }
        return this.http.delete<ApiResponse<T>>(url, {params: httpParams}).pipe(
            map(response => this.handleResponse(response)),
            catchError(error => this.handleError(error))
        );
    }
}
