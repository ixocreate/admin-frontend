import localeDeAt from '@angular/common/locales/de-AT';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserModule, EventManager } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ServiceModule } from './services/service.module';
import { NgrxHelperModule } from './store/store.module';
import { UndoStore } from './store/undo.store';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { NgxDatatableModule } from '@swimlane/ngx-datatable/release';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IXO_CONFIG, IxoConfig } from './services/config.service';
import { AppDataService } from './services/data/app-data.service';
import { AccountComponent } from './views/account/account.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IxoContentComponent } from './components/ixo-content/ixo-content.component';
import { IxoAsideComponent } from './components/ixo-aside/ixo-aside.component';
import { IxoAdminRouting } from './ixo-admin.routing';
import { PageComponent } from './views/page/page.component';
import { TranslationComponent } from './views/translation/translation.component';
import { TranslationListComponent } from './views/translation/list/translation-list.component';
import { IxoBreadcrumbModule } from './components/ixo-breadcrumb/ixo-breadcrumb.module';
import { IxoDatatableComponent } from './components/ixo-datatable/ixo-datatable.component';
import { IxoLoadingComponent } from './components/ixo-loading/ixo-loading.component';
import { TranslationEditComponent } from './views/translation/edit/translation-edit.component';
import { PermissionGuard } from './guards/permission.guard';
import { MediaComponent } from './views/media/media.component';
import { FileUploadModule } from 'ng2-file-upload';
import { IxoMediaListComponent } from './components/ixo-media-list/ixo-media-list.component';
import { PermissionDirective } from './directives/permission.directive';
import { IxoPaginationComponent } from './components/ixo-pagination/ixo-pagination.component';
import { ResourceComponent } from './views/resource/resource.component';
import { ResourceCreateComponent } from './views/resource/create/resource-create.component';
import { ResourceEditComponent } from './views/resource/edit/resource-edit.component';
import { IxoConfirmModalComponent } from './modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { FIELD_TYPE_COMPONENTS, IXO_BOOTSTRAP_FORMLY_CONFIG } from './forms/bootstrap.config';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { IxoSitemapComponent } from './components/ixo-sitemap/ixo-sitemap.component';
import { IxoSitemapItemComponent } from './components/ixo-sitemap-item/ixo-sitemap-item.component';
import { PipesModule } from './pipes/pipes.module';
import { PageCreateComponent } from './views/page/create/page-create.component';
import { PageAddComponent } from './views/page/add/page-add.component';
import { PageEditComponent } from './views/page/edit/page-edit.component';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { IxoInputModalComponent } from './modals/ixo-input-modal/ixo-input-modal.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { IxoEventManager } from './events/ixo.event-manager';
import { IxoMapModalComponent } from './modals/ixo-map-modal/ixo-map-modal.component';
import { MediaEditComponent } from './views/media/edit/media-edit.component';
import { IxoImageCropperComponent } from './components/ixo-image-cropper/ixo-image-cropper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IxoDatePickerComponent } from './components/ixo-date-picker/ixo-date-picker.component';
import { UserComponent } from './views/user/user.component';
import { UserEditComponent } from './views/user/edit/user-edit.component';
import { UserCreateComponent } from './views/user/create/user-create.component';
import { SubComponent } from './views/page/sub/sub.component';
import { FlatComponent } from './views/page/flat/flat.component';
import { SubCreateComponent } from './views/page/sub/sub-create.component';
import { SubAddComponent } from './views/page/sub/sub-add.component';
import { FlatCreateComponent } from './views/page/flat/flat-create.component';
import { FlatAddComponent } from './views/page/flat/flat-add.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { IxoDashboardSlideshowComponent } from './dashboard/ixo-slideshow/ixo-slideshow.component';
import { IxoDashboardCounterComponent } from './dashboard/ixo-counter/ixo-counter.component';
import { IxoDashboardStatisticsOverviewComponent } from './dashboard/ixo-statistics-overview/ixo-statistics-overview.component';
import { RedirectComponent } from './views/redirect/redirect.component';
import { IxoDashboardComponent } from './components/ixo-dashboard/ixo-dashboard.component';
import { IxoDashboardGalleryComponent } from './dashboard/ixo-gallery/ixo-gallery.component';
import { IxoDashboardGraphComponent } from './dashboard/ixo-graph/ixo-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RegistryComponent } from './views/registry/registry.component';
import { RegistryEditComponent } from './views/registry/edit/registry-edit.component';
import { ErrorComponent } from './views/error/error.component';
import { IxoReuseStrategy } from './lib/ixo-reuse-strategy';
import { IxoLinkSelectModalComponent } from './modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { IxoButtonComponent } from './components/ixo-button/ixo-button.component';
import { CalendarModule } from 'primeng/components/calendar/calendar';

/**
 * TODO: move to a dynamic approach to support more locales
 * https://blog.angularindepth.com/dynamic-import-of-locales-in-angular-b994d3c07197
 * https://medium.com/dailyjs/dynamic-locales-in-angular-dd9a527ebe1f
 */
registerLocaleData(localeDeAt);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

const APP_ENTRY_COMPONENTS = [
  IxoConfirmModalComponent,
  IxoInputModalComponent,
  IxoMapModalComponent,
  IxoLinkSelectModalComponent,
];

const APP_COMPONENTS = [
  IxoAsideComponent,
  IxoContentComponent,
  IxoDatatableComponent,
  IxoLoadingComponent,
  IxoMediaListComponent,
  IxoPaginationComponent,
  IxoSitemapComponent,
  IxoSitemapItemComponent,
  IxoImageCropperComponent,
  IxoDatePickerComponent,
  IxoDashboardComponent,

  // Directives
  PermissionDirective,
  ClickStopPropagationDirective,
  DropdownDirective,

  // Views
  ErrorComponent,
  AdminComponent,
  AccountComponent,
  RedirectComponent,

  PageComponent,
  PageCreateComponent,
  PageAddComponent,
  PageEditComponent,
  SubComponent,
  FlatComponent,
  SubCreateComponent,
  SubAddComponent,
  FlatCreateComponent,
  FlatAddComponent,

  TranslationComponent,
  TranslationListComponent,
  TranslationEditComponent,

  MediaComponent,
  MediaEditComponent,

  ResourceComponent,
  ResourceCreateComponent,
  ResourceEditComponent,

  UserComponent,
  UserEditComponent,
  UserCreateComponent,

  DashboardComponent,

  IxoDashboardSlideshowComponent,
  IxoDashboardCounterComponent,
  IxoDashboardStatisticsOverviewComponent,
  IxoDashboardGalleryComponent,
  IxoDashboardGraphComponent,

  IxoButtonComponent,

  RegistryComponent,
  RegistryEditComponent,
];

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
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    IxoAdminRouting,
    IxoBreadcrumbModule.forRoot(),

    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(IXO_BOOTSTRAP_FORMLY_CONFIG),
    FormlyBootstrapModule,
    FileUploadModule,
    NgSelectModule,
    QuillModule.forRoot(),
    CalendarModule,
    ColorPickerModule,
    NgxDnDModule,
    NgxChartsModule,

    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),

    ToastrModule.forRoot({
      autoDismiss: true,
      closeButton: true,
      maxOpened: 5,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
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
    FormlyModule,
    FormlyBootstrapModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
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
