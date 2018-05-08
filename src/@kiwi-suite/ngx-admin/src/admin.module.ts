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
import {AlertModule, BsDatepickerModule, PopoverModule, ProgressbarModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastrModule} from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import {Subscription} from 'rxjs/Subscription';
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
    AppSidebarMinimizerComponent
} from './components';
import {MediaModalListComponent} from './components/media-selector/media-modal-list.component';
import {MediaSelectorComponent} from './components/media-selector/media-selector.component';
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
import {AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';
import {SchemaFormBuilder} from './forms/schema-form-builder';
import {RepeatTypeComponent} from './forms';
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
    UserService
} from './services';
import {setAppInjector} from './services/app-injector.service';
import {PageNotFoundComponent} from './views/errors/page-not-found/page-not-found.component';

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
    RepeatTypeComponent,
    MediaModalListComponent,
    MediaSelectorComponent
];

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
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
        FormlyModule.forRoot({
                types: [
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
        NgSelectModule,
        NgxDatatableModule,
        NgxDnDModule,
        PopoverModule.forRoot(),
        ProgressbarModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        TabsModule.forRoot(),
        ToastrModule.forRoot(),
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
        NgSelectModule,
        NgxDatatableModule,
        NgxDnDModule,
        PopoverModule,
        ReactiveFormsModule,
        // ResourceModule,
        RouterModule,
        TabsModule,
        ToastrModule,
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
         * subscribe to session / config
         * @type {Subscription}
         */
        this.session.ready$
            .subscribe(
                session => {
                    if (!session) {
                        return;
                    }
                    /**
                     * subscribe to configuration once to load user as soon as it's ready
                     * @type {Subscription}
                     */
                    this.config.ready$.subscribe(ready => {
                        if (!ready) {
                            return;
                        }
                        this.account.load();
                    });
                    this.config.load();
                },
                () => {
                    throw new BootstrapError('failed to initialize session');
                }
            );

        /**
         * subscribe to user
         */
        this.account.user$.subscribe(user => {
            if (!user) {
                return;
            }
            this.logger.log('Account User', user);

            /**
             * reload configuration as it is user context sensitive
             */
            this.config.load();
        });
    }
}
