import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Config, ConfigurationService} from './services';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule]
})
export class KiwiModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: KiwiModule,
            providers: [
                ConfigurationService,
                {provide: Config, useValue: options}
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: KiwiModule, private config: ConfigurationService) {
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
         * load project configuration
         */
        this.config.load();
    }
}

