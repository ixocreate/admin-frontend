import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { AppDataService } from './data/app-data.service';
import { AccountDataService } from './data/account-data.service';
import { LocalStorageService } from './local-storage.service';
import { SchemaTransformService } from './schema-transform.service';
import { PageTitleService } from './page-title.service';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        ApiService,
        AuthService,
        ConfigService,
        NotificationService,
        LocalStorageService,
        SchemaTransformService,
        PageTitleService,

        AppDataService,
        AccountDataService,
      ],
    };
  }
}
