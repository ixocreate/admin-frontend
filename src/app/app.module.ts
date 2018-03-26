import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HotkeyModule} from 'angular2-hotkeys';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AdminModule} from '../kiwi';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';

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
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
import {AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';
import {PageNotFoundComponent} from './views/errors/page-not-found/page-not-found.component';
import {MyResourceService} from './services/my-resource.service';

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
    PageNotFoundComponent
];

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
];

/**
 * Register your custom data services here if you want them to be singletons
 * see: https://stackoverflow.com/a/39085113/580651
 */
const DATA_SERVICES = [
    MyResourceService
];

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientXsrfModule,
        // .withOptions({
        //     cookieName: 'XSRF-TOKEN', // this is optional
        //     headerName: 'X-XSRF-TOKEN' // this is optional
        // }),

        /**
         * you can hard code options (e.g. from environment files)...
         */
        // AdminModule.forRoot(<Config>{
        //     project: {
        //         name: 'My Kiwi Project',
        //         copyright: '2018 Me',
        //         poweredBy: true
        //     }
        // }),
        /**
         * ... or set the key for the options that the window object provides
         */
        // AdminModule.forRoot('__myOptionsKey'),
        /**
         * per default it takes the value at window.__kiwi
         */
        AdminModule.forRoot(),

        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        BrowserAnimationsModule,
        ChartsModule,
        HotkeyModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        ...DATA_SERVICES
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
