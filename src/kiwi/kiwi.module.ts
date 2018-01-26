import {ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ApiInterceptor, ConfigurationService, ErrorHandlerService, LoggerService, SessionService, UserService} from './services';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';
import {PermissionGuard} from './permission.guard';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [{provide: ErrorHandler, useClass: ErrorHandlerService}]
})
export class KiwiModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: KiwiModule,
            providers: [
                ConfigurationService,
                LoggerService,
                PermissionGuard,
                SessionService,
                UserService,
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
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: KiwiModule,
                private session: SessionService,
                private config: ConfigurationService,
                private logger: LoggerService,
                private user: UserService) {
        if (parentModule) {
            throw new Error('KiwiModule is already loaded. Import it in the AppModule only');
        }
        this.bootstrap();
    }

    /**
     *
     */
    private bootstrap() {
        /**
         * 1. grab a session
         * 2. load project configuration
         * 3. load user - either redirects to login page or continues with application
         */
        this.session.fetch()
            .flatMap(session => {
                console.log(session);

                return this.config.fetch();
            })
            .flatMap(() => this.user.fetch())
            .subscribe(result => {
                this.logger.log('bootstrapped', result);
            }, error => {
                // throw new BootstrapError();
            });
    }
}

