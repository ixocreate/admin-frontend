import localeDeAt from '@angular/common/locales/de-AT';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, EventManager } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { NgrxHelperModule } from './store/store.module';
import { UndoStore } from './store/undo.store';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IXO_CONFIG, IxoConfig } from './services/config.service';
import { AppDataService } from './services/data/app-data.service';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IxoAdminRouting } from './ixo-admin.routing';
import { PermissionGuard } from './guards/permission.guard';
import { PipesModule } from './pipes/pipes.module';
import { IxoEventManager } from './events/ixo-event-manager';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IxoReuseStrategy } from './lib/ixo-reuse-strategy';
import { IxoComponentsModule } from './components/ixo-components.module';
import { ContainersModule } from './containers/containers.module';
import { DirectivesModule } from './directives/directives.module';
import { ViewsModule } from './views/views.module';
import { ModalsModule } from './modals/modals.module';
import { TypesModule } from './forms/types/types.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule } from './forms/forms.module';

/**
 * TODO: move to a dynamic approach to support more locales
 * https://blog.angularindepth.com/dynamic-import-of-locales-in-angular-b994d3c07197
 * https://medium.com/dailyjs/dynamic-locales-in-angular-dd9a527ebe1f
 */
registerLocaleData(localeDeAt);

export function initConfig(appData: AppDataService, injector: Injector): () => Promise<any> {
  return async (): Promise<any> => {
    const router = injector.get(Router);
    try {
      await appData.loadConfig();
      setTimeout(() => {
        if (router.url === '/error') {
          router.navigateByUrl('/');
        }
      });
    } catch (e) {
      router.navigateByUrl('/error');
    }
    return Promise.resolve();
  };
}

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IxoAdminRouting,
    IxoComponentsModule,
    ContainersModule,
    DirectivesModule,
    ModalsModule,
    TypesModule,
    DashboardModule,
    FormsModule,
    ServicesModule,
    PipesModule,

    StoreModule.forRoot({}, {
      metaReducers: [
        UndoStore.Handle,
      ],
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    NgrxHelperModule.forRoot()
  ],
  declarations: [
    AdminComponent
  ],
  exports: [
    IxoComponentsModule,
    ContainersModule,
    DirectivesModule,
    ViewsModule,
    FormlyBootstrapModule,
    PipesModule,
    RouterModule,
    AdminComponent
  ],
})
export class IxoAdminModule {

  static forRoot(config: IxoConfig = {}): ModuleWithProviders {
    return {
      ngModule: IxoAdminModule,
      providers: [
        PermissionGuard,
        {
          provide: IXO_CONFIG,
          useValue: config,
        },
        {
          provide: RouteReuseStrategy,
          useClass: IxoReuseStrategy,
        },
        {
          provide: LocationStrategy,
          useClass: HashLocationStrategy,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppDataService, Injector],
          multi: true,
        },
        {
          provide: EventManager,
          useClass: IxoEventManager,
        },
      ],
    };
  }

}
