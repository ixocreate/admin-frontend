import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { AlertModule, TabsModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PACKAGE_CONFIG, PackageConfig } from './services/config.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

const APP_COMPONENTS = [
  AdminComponent,
  LoginComponent,
];


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

    TabsModule.forRoot(),
    AlertModule.forRoot(),

    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      maxOpened: 5,
      progressBar: true,
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

  static forRoot(config: PackageConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxAdminModule,
      providers: [
        {
          provide: PACKAGE_CONFIG,
          useValue: config,
        },
        {
          provide: LocationStrategy,
          useClass: HashLocationStrategy,
        },
      ],
    };
  }

}
