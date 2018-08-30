import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ServiceModule } from './services/service.module';
import { NgrxHelperModule } from './store/store.module';
import { UndoStore } from './store/undo.store';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './views/auth/login/login.component';
import {
  AlertModule,
  BsDatepickerModule,
  BsDropdownModule,
  ModalModule,
  PaginationModule,
  ProgressbarModule,
  TabsModule,
} from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { KIWI_CONFIG, KiwiConfig } from './services/config.service';
import { AppDataService } from './services/data/app-data.service';
import { AccountComponent } from './views/account/account.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KiwiContentComponent } from './components/kiwi-content/kiwi-content.component';
import { KiwiAsideComponent } from './components/kiwi-aside/kiwi-aside.component';
import { KiwiAdminRouting } from './kiwi-admin.routing';
import { PageComponent } from './views/page/page.component';
import { TranslationComponent } from './views/translation/translation.component';
import { TranslationListComponent } from './views/translation/list/translation-list.component';
import { KiwiBreadcrumbModule } from './components/kiwi-breadcrumb/kiwi-breadcrumb.module';
import { KiwiDatatableComponent } from './components/kiwi-datatable/kiwi-datatable.component';
import { KiwiLoadingComponent } from './components/kiwi-loading/kiwi-loading.component';
import { TranslationEditComponent } from './views/translation/edit/translation-edit.component';
import { PermissionGuard } from './guards/permission.guard';
import { MediaComponent } from './views/media/media.component';
import { FileUploadModule } from 'ng2-file-upload';
import { KiwiMediaListComponent } from './components/kiwi-media-list/kiwi-media-list.component';
import { PermissionDirective } from './directives/permission.directive';
import { KiwiPaginationComponent } from './components/kiwi-pagination/kiwi-pagination.component';
import { ResourceComponent } from './views/resource/resource.component';
import { ResourceCreateComponent } from './views/resource/create/resource-create.component';
import { ResourceEditComponent } from './views/resource/edit/resource-edit.component';
import { KiwiConfirmModalComponent } from './components/kiwi-confirm-modal/kiwi-confirm-modal.component';
import { FIELD_TYPE_COMPONENTS, KIWI_BOOTSTRAP_FORMLY_CONFIG } from './forms/bootstrap.config';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { KiwiSitemapComponent } from './components/kiwi-sitemap/kiwi-sitemap.component';
import { KiwiSitemapItemComponent } from './components/kiwi-sitemap-item/kiwi-sitemap-item.component';
import { PipesModule } from './pipes/pipes.module';
import { PageCreateComponent } from './views/page/create/page-create.component';
import { PageAddComponent } from './views/page/add/page-add.component';
import { PageEditComponent } from './views/page/edit/page-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { CalendarModule } from 'primeng/primeng';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';
import { KiwiPageVersionEditComponent } from './components/kiwi-page-version/kiwi-page-version-edit.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { KiwiInputModalComponent } from './components/kiwi-input-modal/kiwi-input-modal.component';

import { Injectable, Inject, NgZone  } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManager } from '@angular/platform-browser';

@Injectable()
export class CustomEventManager extends EventManager {
  constructor(@Inject(EVENT_MANAGER_PLUGINS) plugins: any[], private zone: NgZone) {
    super(plugins, zone);
  }

  addGlobalEventListener(element: string, eventName: string, handler: Function): Function {
    if(eventName.endsWith('out-zone')) {
      eventName = eventName.split('.')[0];
      return this.zone.runOutsideAngular(() =>
        super.addGlobalEventListener(element, eventName, handler));
    }

    return super.addGlobalEventListener(element, eventName, handler);
  }
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

const APP_ENTRY_COMPONENTS = [
  KiwiConfirmModalComponent,
  KiwiInputModalComponent,
];

const APP_COMPONENTS = [
  KiwiAsideComponent,
  KiwiContentComponent,
  KiwiDatatableComponent,
  KiwiLoadingComponent,
  KiwiMediaListComponent,
  KiwiPaginationComponent,
  KiwiSitemapComponent,
  KiwiSitemapItemComponent,
  KiwiPageVersionEditComponent,

  // Directives
  PermissionDirective,
  ClickStopPropagationDirective,

  // Views
  AdminComponent,
  LoginComponent,
  AccountComponent,

  PageComponent,
  PageCreateComponent,
  PageAddComponent,
  PageEditComponent,

  TranslationComponent,
  TranslationListComponent,
  TranslationEditComponent,

  MediaComponent,

  ResourceComponent,
  ResourceCreateComponent,
  ResourceEditComponent,
];

export function initConfig(appData: AppDataService): () => Promise<any> {
  return (): Promise<any> => {
    return appData.loadSession().then(() => appData.loadConfig());
  };
}

export class KiwiReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.params && curr.params && future.params.type !== curr.params.type) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    KiwiAdminRouting,
    KiwiBreadcrumbModule.forRoot(),

    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ChartsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(KIWI_BOOTSTRAP_FORMLY_CONFIG),
    FormlyBootstrapModule,
    FileUploadModule,
    NgSelectModule,
    QuillModule,
    CalendarModule,
    ColorPickerModule,
    NgxDnDModule,

    TabsModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),

    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      maxOpened: 5,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-top-right',
      timeOut: 4000,
    }),
    StoreModule.forRoot({}, {
      metaReducers: [
        UndoStore.Handle,
      ],
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    NgrxHelperModule.forRoot(),

    ServiceModule.forRoot(),
    PipesModule.forRoot(),
  ],
  declarations: [
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_ENTRY_COMPONENTS,
    ...FIELD_TYPE_COMPONENTS,
  ],
  entryComponents: [
    ...APP_ENTRY_COMPONENTS,
  ],
  exports: [
    RouterModule,
  ],
})
export class KiwiAdminModule {

  static forRoot(config: KiwiConfig = {}): ModuleWithProviders {
    return {
      ngModule: KiwiAdminModule,
      providers: [
        PermissionGuard,
        NoAuthGuard,
        AuthGuard,
        {
          provide: KIWI_CONFIG,
          useValue: config,
        },
        {
          provide: RouteReuseStrategy,
          useClass: KiwiReuseStrategy,
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
        { provide: EventManager, useClass: CustomEventManager }
      ],
    };
  }

}
