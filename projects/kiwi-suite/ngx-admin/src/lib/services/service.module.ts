import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { AppDataService } from './data/app-data.service';

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
        AppDataService,
      ],
    };
  }
}
