import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router, RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {HotkeyModule} from 'angular2-hotkeys';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FileUploadModule} from 'ng2-file-upload';
import {
    AlertModule,
    BsDatepickerModule,
    ModalModule, PaginationModule,
    PopoverModule,
    ProgressbarModule
} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastrModule} from 'ngx-toastr';
import {flatMap} from 'rxjs/operators';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
import {BootstrapError} from './models';
import {
    AccountService,
    ApiInterceptor,
    ApiService,
    ConfigurationService,
    DataStoreService,
    ErrorHandlerService,
    LoggerService,
    ResourceService,
    MediaService,
    PageService,
    SessionService,
    setAppInjector,
    UserService
} from './services';
import {AuthModule} from './views/auth';
import {PageNotFoundComponent} from './views/errors';
import {AppLoaderComponent} from "./components/app-loader/app-loader.component";
import {AppBackgroundComponent} from "./components/app-background/app-background.component";
import {AppDebugComponent} from "./components/app-debug/app-debug.component";
import {AppContentComponent} from "./components/app-content/app-content.component";
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {UserIndexComponent} from "./views/user/user-index.component";
import {ResourceDetailComponent} from "./views/resource/resource-detail.component";
import {ResourceEditComponent} from "./views/resource/resource-edit.component";
import {ResourceIndexComponent} from "./views/resource/resource-index.component";
import {AccountComponent} from "./views/account/account.component";
import {ResourceCreateComponent} from "./views/resource/resource-create.component";
import {MediaIndexComponent} from "./views/media/media-index.component";
import {MediaListComponent} from "./views/media/components/media-list.component";
import {MediaSelectorComponent} from "./views/media/components/media-selector.component";
import {BOOTSTRAP_FORMLY_CONFIG, FIELD_TYPE_COMPONENTS} from './forms/bootstrap.config';
import {QuillModule} from "ngx-quill";
import {PageIndexComponent} from "./views/page/page-index.component";
import {SitemapListComponent} from "./views/page/components/sitemap-list.component";
import {SitemapListContainerComponent} from "./views/page/components/sitemap-list-container.component";
import {SitemapListItemComponent} from "./views/page/components/sitemap-list-item.component";
import {PageEditComponent} from "./views/page/page-edit.component";
import {PageCreateComponent} from "./views/page/page-create.component";
import {PageVersionService} from "./services/resource/page-version.service";
import {PageVersionEditComponent} from "./views/page/page-version/page-version-edit.component";
import {LinkSelectorComponent} from "./forms/types/component/link-selector.component";
import {YoutubeSelectorComponent} from "./forms/types/component/youtube-selector.component";
import {SitemapModalListComponent} from "./forms/types/component/link/sitemap-modal-list.component";
import {SitemapModalListItemComponent} from "./forms/types/component/link/sitemap-modal-list-item.component";
import {AppAsideComponent} from './components/app-aside/app-aside.component';
import {PageFlatIndexComponent} from "./views/page-flat/page-flat-index.component";
import {PageFlatCreateComponent} from "./views/page-flat/page-flat-create.component";
import {PageListComponent} from "./views/page-flat/components/page-list.component";
import { ColorPickerModule } from 'ngx-color-picker';
import {ColorSelectorComponent} from "./forms/types/component/color-selector.component";
import {SchemaTransformService} from "./services/schema-transform.service";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};



const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

const APP_COMPONENTS = [
    AppLoaderComponent,
    AppBackgroundComponent,
    AppDebugComponent,
    AppContentComponent,
    AppAsideComponent,
    PageNotFoundComponent,
    UserIndexComponent,
    ResourceDetailComponent,
    ResourceEditComponent,
    ResourceIndexComponent,
    ResourceCreateComponent,
    MediaIndexComponent,
    MediaListComponent,
    MediaSelectorComponent,
    AccountComponent,
    PageIndexComponent,
    PageEditComponent,
    PageCreateComponent,
    SitemapListComponent,
    SitemapListContainerComponent,
    SitemapListItemComponent,
    PageVersionEditComponent,
    LinkSelectorComponent,
    YoutubeSelectorComponent,
    SitemapModalListComponent,
    SitemapModalListItemComponent,
    PageFlatIndexComponent,
    PageFlatCreateComponent,
    PageListComponent,
    ColorSelectorComponent,
];

const APP_FEATURE_MODULES = [
    AuthModule,
    //LinkModule,
    //SitemapModule,
];

const APP_DIRECTIVES = [
];

@NgModule({
    imports: [
        AdminRoutingModule,
        //AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        AlertModule.forRoot(),
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PerfectScrollbarModule,
        ChartsModule,
        ClipboardModule,
        CommonModule,
        FormlyModule.forRoot(BOOTSTRAP_FORMLY_CONFIG),
        FormsModule,
        HotkeyModule.forRoot(),
        HttpClientModule,
        // HttpClientXsrfModule,
        // .withOptions({
        //     cookieName: 'XSRF-TOKEN', // this is optional
        //     headerName: 'X-XSRF-TOKEN' // this is optional
        // }),
        FileUploadModule,
        ModalModule.forRoot(),
        NgSelectModule,
        NgxDatatableModule,
        ColorPickerModule,
        PaginationModule.forRoot(),
        NgxDnDModule,
        PopoverModule.forRoot(),
        ProgressbarModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        TabsModule.forRoot(),
        QuillModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            easeTime: 80,
            autoDismiss: true,
            closeButton: false,
            maxOpened: 1,
            newestOnTop: false,
            progressBar: true,
            timeOut: 2400,
        }),
        APP_FEATURE_MODULES,
    ],
    declarations: [
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
        ...FIELD_TYPE_COMPONENTS,
        AdminComponent
    ],
    providers: [
        SchemaTransformService,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        },
    ],
    exports: [
        AlertModule,
        BrowserAnimationsModule,
        BsDatepickerModule,
        BsDropdownModule,
        ChartsModule,
        ClipboardModule,
        FormsModule,
        FormlyModule,
        HotkeyModule,
        HttpClientModule,
        ModalModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxDnDModule,
        PopoverModule,
        ReactiveFormsModule,
        RouterModule,
        TabsModule,
        ToastrModule,
        APP_COMPONENTS,
        APP_FEATURE_MODULES
    ]
})
export class AdminModule {

    static forRoot(options?: any, environment?: any) {
        return {
            ngModule: AdminModule,
            providers: [
                {
                    provide: ErrorHandler,
                    useClass: ErrorHandlerService
                },
                {
                    provide: 'Config',
                    useValue: options
                },
                {
                    provide: 'AppState',
                    useValue: {
                        resources: [],
                    }
                },
                [{
                    provide: HTTP_INTERCEPTORS,
                    useClass: ApiInterceptor,
                    multi: true,
                }],
                AccountService,
                ApiService,
                ConfigurationService,
                DataStoreService,
                LoggerService,
                MediaService,
                PageService,
                SessionService,
                UserService,
                ResourceService,
                PageVersionService,
            ],
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AdminModule,
                private session: SessionService,
                private config: ConfigurationService,
                private logger: LoggerService,
                private router: Router,
                private account: AccountService,
                private user: UserService,
                private media: MediaService,
                private page: PageService,
                private dataStore: DataStoreService,
                private injector: Injector) {
        if (parentModule) {
            throw new Error('AdminModule is already loaded. Import it in the AppModule only');
        }

        this.dataStore.register(this.account);
        this.dataStore.register(this.user);
        this.dataStore.register(this.media);
        this.dataStore.register(this.page);

        setAppInjector(injector);
        this.bootstrap();
    }

    /**
     *@
     */
    private bootstrap() {
        /**
         * load session -> config -> account -> config
         */
        this.session.ready$.pipe(
            flatMap(() => {
                this.config.load();
                return this.config.ready$.pipe(
                    flatMap(() => {
                        this.account.load();
                        return this.account.user$;
                    })
                );
            })
        ).subscribe(
            user => {
                // console.log('user', user);
            },
            () => {
                throw new BootstrapError('failed to initialize session');
            }
        );

        /**
         * reload configuration each time user is loaded as it is user context sensitive
         */
        this.account.user$.subscribe(user => {
            if (!user || !user.id) {
                return;
            }
            this.logger.log('[User] account %c[' + user.id + '] ' + user.email + ' ' + user.role, 'color: #bb5555');

            //very dirty check: only load config after login
            if (this.config.params.navigation.length === 0) {
                this.config.load();
            }
        });
    }
}
