import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { catchError, map, publishLast, refCount, retryWhen, timeout } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { genericRetryStrategy } from './generic-retry-strategy';
import { _throw } from 'rxjs/observable/throw';
import { tap } from 'rxjs/internal/operators';

export enum ApiRequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  HEAD = 'head',
  OPTIONS = 'options',
}

export interface APIErrorElement {
  identifier: string;
  error: string;
}

export interface APIError {
  message: string;
  data: Array<APIErrorElement>;
}

export interface APIResponse {
  success: Boolean;
  result?: any;
  error?: APIError;
}

@Injectable()
export class ApiService {

  constructor(protected http: HttpClient,
              protected config: ConfigService,
              protected auth: AuthService,
              protected tokenExtractor: HttpXsrfTokenExtractor) {
  }

  /**
   * @description Headers for requests
   */
  protected get headers(): HttpHeaders {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (this.auth.isAuthenticated()) {
      headers = headers.append('Authorization', `Bearer ${this.auth.getToken()}`);
    }
    return headers;
  }

  /**
   * @description Sends a request to the server
   */
  protected request(method: ApiRequestMethod, url: string, body: any = null): Observable<any> {
    return this.http.request(<string>method, url, {
      body,
      headers: this.headers,
      observe: 'events',
      withCredentials: !this.config.environment.production,
    }).pipe(
      timeout(10000),
      retryWhen(genericRetryStrategy()),
      publishLast(),
      refCount(),
      tap((val) => {
        const authHeader = val.headers.get('Authorization');
        if (authHeader) {
          this.auth.setToken(authHeader.replace('Bearer ', ''));
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.auth.clearToken();
          window.location.reload();
          return null;
        }
        return _throw(error);
      }),
      map((response: HttpResponse<any>) => {
        const apiResponse: APIResponse = response.body;
        if (typeof apiResponse.success === 'undefined') {
          return apiResponse;
        }
        if (apiResponse.success) {
          return apiResponse.result;
        } else {
          throw apiResponse.error || null;
        }
      }),
    );
  }

  get(url: string): Promise<any> {
    return this.request(ApiRequestMethod.GET, url, null).toPromise();
  }

  post(url: string, body: any): Promise<any> {
    return this.request(ApiRequestMethod.POST, url, body).toPromise();
  }

  put(url: string, body: any): Promise<any> {
    return this.request(ApiRequestMethod.PUT, url, body).toPromise();
  }

  delete(url: string): Promise<any> {
    return this.request(ApiRequestMethod.DELETE, url, null).toPromise();
  }

  patch(url: string, body: any): Promise<any> {
    return this.request(ApiRequestMethod.PATCH, url, body).toPromise();
  }

  head(url: string): Promise<any> {
    return this.request(ApiRequestMethod.HEAD, url, null).toPromise();
  }

  options(url: string): Promise<any> {
    return this.request(ApiRequestMethod.OPTIONS, url, null).toPromise();
  }

}
