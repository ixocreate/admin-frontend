import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import {Subscription} from 'rxjs/Subscription';
import {SchemaFormBuilder} from './forms/schema-form-builder';
import {BootstrapError} from './models';
import {PermissionGuard} from './permission.guard';
import {
    AccountService,
    ApiInterceptor,
    ApiService,
    ConfigurationService,
    ErrorHandlerService,
    LoggerService,
    SessionService,
    UserService
} from './services';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
    ]
})
export class AdminModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: [
                {
                    provide: ErrorHandler,
                    useClass: ErrorHandlerService
                },
                {
                    provide: 'Config',
                    useValue: options
                },
                [{
                    provide: HTTP_INTERCEPTORS,
                    useClass: ApiInterceptor,
                    multi: true,
                }],
                AccountService,
                ApiService,
                ConfigurationService,
                LoggerService,
                PermissionGuard,
                SessionService,
                SchemaFormBuilder,
                UserService,
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AdminModule,
                private session: SessionService,
                private config: ConfigurationService,
                private logger: LoggerService,
                private router: Router,
                private account: AccountService) {
        if (parentModule) {
            throw new Error('AdminModule is already loaded. Import it in the AppModule only');
        }
        this.bootstrap();
    }

    /**
     *@
     */
    private bootstrap() {
        /**
         * subscribe to session / config
         * @type {Subscription}
         */
        this.session.ready$
            .subscribe(
                session => {
                    if (!session) {
                        return;
                    }
                    /**
                     * subscribe to configuration once to load user as soon as it's ready
                     * @type {Subscription}
                     */
                    this.config.ready$.subscribe(ready => {
                        if (!ready) {
                            return;
                        }
                        this.account.load();
                    });
                    this.config.load();
                },
                () => {
                    throw new BootstrapError('failed to initialize session');
                }
            );

        /**
         * subscribe to user
         */
        this.account.user$.subscribe(user => {
            if (!user) {
                return;
            }
            this.logger.log('Account User', user);

            /**
             * reload configuration as it is user context sensitive
             */
            this.config.load();

            /**
             * TODO: redirect user to favourite/default view by setting
             */
            // this.router.navigateByUrl('dashboard');
        });
    }
}

