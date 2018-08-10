import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ServiceModule } from './services/service.module';
import { NgrxHelperModule } from './store/store.module';
import { UndoStore } from './store/undo.store';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxAdminRouting } from './ngx-admin.routing';
import { LoginComponent } from './views/auth/login/login.component';
import { AlertModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { KIWI_CONFIG, KiwiConfig } from './services/config.service';
import { AppDataService } from './services/data/app-data.service';
import { AccountComponent } from './views/account/account.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KiwiContentComponent } from './components/kiwi-content/kiwi-content.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

const APP_COMPONENTS = [
  KiwiContentComponent,

  // Views
  AdminComponent,
  LoginComponent,
  AccountComponent,
];

export function initConfig(appData: AppDataService): () => Promise<any> {
  return (): Promise<any> => {
    return appData.loadConfig();
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    NgxAdminRouting,

    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ChartsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyBootstrapModule,

    TabsModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),

    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      maxOpened: 5,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-top-right',
      timeOut: 5000,
    }),
    StoreModule.forRoot({}, {
      metaReducers: [
        UndoStore.Handle,
      ],
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    NgrxHelperModule.forRoot(),

    ServiceModule.forRoot(),
  ],
  declarations: [
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
  ],
  exports: [
    RouterModule,
  ],
})
export class NgxAdminModule {

  static forRoot(config: KiwiConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxAdminModule,
      providers: [
        {
          provide: KIWI_CONFIG,
          useValue: config,
        },
        {
          provide: LocationStrategy,
          useClass: HashLocationStrategy,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppDataService],
          multi: true,
        },
      ],
    };
  }

}
