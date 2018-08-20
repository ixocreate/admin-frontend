import { ModuleWithProviders, NgModule } from '@angular/core';
import { KeyValuePipe } from './keyvalue.pipe';
import { KiwiDatePipe } from './kiwi-date.pipe';
import { KiwiDateTimePipe } from './kiwi-date-time.pipe';
import { AccountDataService } from '../services/data/account-data.service';
import { ServiceModule } from '../services/service.module';
import { ConfigService } from '../services/config.service';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationService } from '../services/notification.service';
import { PageTitleService } from '../services/page-title.service';
import { AuthService } from '../services/auth.service';
import { SchemaTransformService } from '../services/schema-transform.service';
import { AppDataService } from '../services/data/app-data.service';
import { ApiService } from '../services/api.service';

const COMPONENTS = [
  KeyValuePipe,
  KiwiDatePipe,
  KiwiDateTimePipe,
];

@NgModule({
  imports: [
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        ...COMPONENTS,
      ],
    };
  }
}
