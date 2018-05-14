import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router, RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
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
    MediaModalListComponent,
    MediaSelectorComponent
} from './components';
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
import {AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';
import {MediaTypeComponent, RepeatTypeComponent} from './forms';
import {SchemaFormBuilder} from './forms/schema-form-builder';
import {BootstrapError} from './models';
import {PermissionGuard} from './permission.guard';
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

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

const APP_FORM = [
    MediaTypeComponent,
    MediaModalListComponent,
    MediaSelectorComponent,
    RepeatTypeComponent,
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
    APP_FORM,
];

const APP_VIEWS_MODULES = [
    AccountModule,
    AuthModule,
    DashboardModule,
    MediaModule,
    ResourceModule,
    UserModule,
];

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
];

// @dynamic
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
        FormlyModule.forRoot({
                types: [
                    {name: 'media', component: MediaTypeComponent},
                    {name: 'repeat', component: RepeatTypeComponent},
                ],
            }
        ),
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
        QuillModule,
        ReactiveFormsModule,
        RouterModule,
        TabsModule.forRoot(),
        ToastrModule.forRoot(),
        APP_VIEWS_MODULES
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
        HotkeyModule,
        HttpClientModule,
        ModalModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxDnDModule,
        PopoverModule,
        QuillModule,
        ReactiveFormsModule,
        RouterModule,
        TabsModule,
        ToastrModule,
        APP_COMPONENTS,
        APP_VIEWS_MODULES
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
                PermissionGuard,
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
                console.error('user?', user);
            },
            () => {
                throw new BootstrapError('failed to initialize session');
            }
        );

        /**
         * reload configuration each time user is loaded as it is user context sensitive
         */
        this.account.model$.subscribe(user => {
            if (!user) {
                return;
            }
            this.logger.log('account User', user);
            this.logger.log('reload config');
            this.config.load();
        });
    }
}
