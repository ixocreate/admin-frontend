import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ApiService, ConfigurationService, SessionService} from './services';
import {CommonModule} from '@angular/common';
import {Config} from './models';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './http/api.interceptor';

@NgModule({
    imports: [CommonModule]
})
export class KiwiModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: KiwiModule,
            providers: [
                ConfigurationService,
                SessionService,
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

    constructor(@Optional() @SkipSelf() parentModule: KiwiModule, private session: SessionService, private config: ConfigurationService) {
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
         * grab a session
         */
        this.session.start()
            .then(response => {
                /**
                 * load project configuration
                 */
                this.config.load();
            })
            .catch(ApiService.handleError);
    }
}

