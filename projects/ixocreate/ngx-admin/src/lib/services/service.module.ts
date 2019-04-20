import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { AppDataService } from './data/app-data.service';
import { AccountDataService } from './data/account-data.service';
import { LocalStorageService } from './local-storage.service';
import { SchemaTransformService } from './schema-transform.service';
import { PageTitleService } from './page-title.service';
import { CopyService } from './copy.service';
import { DataTableTypesService } from './data-table-types.service';
import { DashboardService } from './dashboard.service';

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
        ConfigService,
        NotificationService,
        LocalStorageService,
        SchemaTransformService,
        PageTitleService,
        CopyService,
        DataTableTypesService,
        DashboardService,

        AppDataService,
        AccountDataService,
      ],
    };
  }
}
