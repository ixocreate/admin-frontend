import {ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ApiInterceptor, ConfigurationService, ErrorHandlerService, LoggerService, SessionService, UserService} from './services';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';
import {PermissionGuard} from './permission.guard';
import {Router} from '@angular/router';
import {BootstrapError} from './models';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [{provide: ErrorHandler, useClass: ErrorHandlerService}]
})
export class AdminModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: AdminModule,
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

    constructor(@Optional() @SkipSelf() parentModule: AdminModule,
                private session: SessionService,
                private config: ConfigurationService,
                private logger: LoggerService,
                private router: Router,
                private user: UserService) {
        if (parentModule) {
            throw new Error('AdminModule is already loaded. Import it in the AppModule only');
        }
        this.bootstrap();
    }

    /**
     *@
     */
    private bootstrap() {
        this.logger.log('bootstrap module');

        this.logger.log('initialize session');

        this.session.session$.subscribe(
            session => {
                if (!session) {
                    return;
                }
                this.config.load();
            },
            () => {
                throw new BootstrapError('failed to initialize session');
            }
        );

        this.user.user$.subscribe(user => {
            if (!user) {
                return;
            }

            this.logger.log('user', user);

            /**
             * TODO: redirect user to favourite/default view by setting
             */
            this.router.navigateByUrl('dashboard');
        });
    }
}

