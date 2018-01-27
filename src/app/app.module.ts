import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {KiwiModule} from '../kiwi';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {
    APP_SIDEBAR_NAV,
    AppAsideComponent,
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

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

const APP_COMPONENTS = [
    AppAsideComponent,
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
    APP_SIDEBAR_NAV
];

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
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
        // KiwiModule.forRoot(<Config>{
        //     project: {
        //         name: 'My Kiwi Project',
        //         copyright: '2018 Me',
        //         poweredBy: true
        //     }
        // }),
        /**
         * ... or set the key for the options that the window object provides
         */
        // KiwiModule.forRoot('__myOptionsKey'),
        /**
         * per default it takes the value at window.__kiwi
         */
        KiwiModule.forRoot(),

        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
