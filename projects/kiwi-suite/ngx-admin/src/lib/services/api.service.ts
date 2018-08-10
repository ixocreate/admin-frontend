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
  code: string;
  data: APIErrorMessages;
}

export interface APIErrorMessages {
  title: string;
  messages: Array<string>;
}

export interface APIResponse {
  success: Boolean;
  result?: any;
  errorCode?: string;
  errorMessages?: Array<string>;
}

@Injectable()
export class ApiService {

  constructor(protected http: HttpClient,
              protected config: ConfigService,
              protected auth: AuthService) {
  }

  /**
   * @description Headers for requests
   */
  protected get headers(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  /**
   * @description Headers for requests
   */
  private errorMapping(response: APIResponse): APIErrorElement {
    const errors: APIErrorElement = {
      code: response.errorCode,
      data: {
        title: 'Error',
        messages: [],
      },
    };
    for (const message of response.errorMessages) {
      errors.data.messages.push(message);
    }
    return errors;
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
      catchError((error) => {
        /*
        if (error.status === 401) {
          window.location.reload();
          return null;
        }
        */
        return _throw(error.error ? this.errorMapping(error.error) : null);
      }),
      map((response: HttpResponse<any>) => {
        const apiResponse: APIResponse = response.body;
        if (typeof apiResponse.success === 'undefined') {
          return apiResponse;
        }
        if (apiResponse.success) {
          return apiResponse.result;
        } else {
          throw apiResponse ? this.errorMapping(apiResponse) : null;
        }
      }),
    );
  }

  get(url: string): Promise<any> {
    return this.request(ApiRequestMethod.GET, url, null).toPromise();
  }

  post(url: string, body: any = {}): Promise<any> {
    return this.request(ApiRequestMethod.POST, url, body).toPromise();
  }

  put(url: string, body: any = {}): Promise<any> {
    return this.request(ApiRequestMethod.PUT, url, body).toPromise();
  }

  delete(url: string): Promise<any> {
    return this.request(ApiRequestMethod.DELETE, url, null).toPromise();
  }

  patch(url: string, body: any = {}): Promise<any> {
    return this.request(ApiRequestMethod.PATCH, url, body).toPromise();
  }

  head(url: string): Promise<any> {
    return this.request(ApiRequestMethod.HEAD, url, null).toPromise();
  }

  options(url: string): Promise<any> {
    return this.request(ApiRequestMethod.OPTIONS, url, null).toPromise();
  }

}
