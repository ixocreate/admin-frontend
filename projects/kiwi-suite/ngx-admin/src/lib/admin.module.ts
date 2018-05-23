import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
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
import {AlertModule, BsDatepickerModule, ModalModule, PopoverModule, ProgressbarModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ClipboardModule} from 'ngx-clipboard';
import {QuillModule} from 'ngx-quill';
import {ToastrModule} from 'ngx-toastr';
import {flatMap} from 'rxjs/operators';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {
    APP_SIDEBAR_NAV,
    AppAsideComponent,
    AppBackgroundComponent,
    AppBreadcrumbsComponent,
    AppDebugComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppLoaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
} from './components';
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
import {AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';
import {FormlyBootstrapModule} from './forms/bootstrap';
import {SchemaFormBuilder} from './forms/schema-form-builder';
import {BootstrapError} from './models';
import {
    AccountService,
    ApiInterceptor,
    ApiService,
    ConfigurationService,
    DataStoreService,
    ErrorHandlerService,
    LoggerService,
    MediaService,
    SessionService,
    setAppInjector,
    UserService
} from './services';
import {AccountModule} from './views/account';
import {AuthModule} from './views/auth';
import {DashboardModule} from './views/dashboard';
import {PageNotFoundComponent} from './views/errors';
import {MediaModule} from './views/media';
import {ResourceModule} from './views/resource';
import {UserModule} from './views/user';
import {SitemapModule} from "./views/sitemap";

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

const APP_COMPONENTS = [
    AppAsideComponent,
    AppBackgroundComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppLoaderComponent,
    AppDebugComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    APP_SIDEBAR_NAV,
    PageNotFoundComponent,
];

const APP_FEATURE_MODULES = [
    AccountModule,
    AuthModule,
    DashboardModule,
    MediaModule,
    ResourceModule,
    UserModule,
    SitemapModule,
];

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
];

@NgModule({
    imports: [
        AdminRoutingModule,
        AlertModule.forRoot(),
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ChartsModule,
        ClipboardModule,
        CommonModule,
        FormlyModule,
        FormlyBootstrapModule,
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
        NgxDnDModule,
        PopoverModule.forRoot(),
        ProgressbarModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        TabsModule.forRoot(),
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
        APP_FEATURE_MODULES
    ],
    declarations: [
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
        AdminComponent
    ],
    providers: [
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

    static forRoot(options?: any, environment?: any): ModuleWithProviders {
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
                SchemaFormBuilder,
                SessionService,
                UserService
            ],
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AdminModule,
                private session: SessionService,
                private config: ConfigurationService,
                private logger: LoggerService,
                private router: Router,
                private account: AccountService,
                private injector: Injector) {
        if (parentModule) {
            throw new Error('AdminModule is already loaded. Import it in the AppModule only');
        }
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
        this.account.model$.subscribe(user => {
            if (!user || !user.id) {
                return;
            }
            this.logger.log('[User] account %c[' + user.id + '] ' + user.email + ' ' + user.role, 'color: #bb5555');
            this.config.load();
        });
    }
}
