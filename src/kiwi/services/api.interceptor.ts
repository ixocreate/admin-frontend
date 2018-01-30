import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpXsrfTokenExtractor
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/do';
import {LoggerService} from './logger.service';

// from: https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private router: Router, private logger: LoggerService, private tokenExtractor: HttpXsrfTokenExtractor) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /**
         * in non-production environments, set the withCredentials flag to true for all requests
         * this allows to develop the admin application on a different local domain and make calls to a local admin api
         */
        if (!environment.production) {
            request = request.clone({withCredentials: true});
        }

        /**
         * setting a content type for GET requests causes OPTIONS pre-flight
         * GET requests may have a body, but _should_ not bear any meaning
         * https://stackoverflow.com/a/983458
         *
         * only apply content type json to post and put requests
         */
        if (request.method === 'post' || request.method === 'put') {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }

        /**
         * absolute urls will not have xsrf token injected automatically
         * apply it manually
         */
        const headerName = 'X-XSRF-TOKEN';
        const token = this.tokenExtractor.getToken() as string;
        if (token !== null && !request.headers.has(headerName)) {
            request = request.clone({headers: request.headers.set(headerName, token)});
        }

        return next.handle(request)
            .do(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response if you want
                    }
                },
                (err: any) => {
                    // this.logger.logError(err);
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            // redirect to the login route
                            // or show a modal
                            this.router.navigateByUrl('auth/login');
                        }
                    }
                }
            );
    }
}
