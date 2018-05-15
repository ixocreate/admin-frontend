import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AdminModule} from '@kiwi-suite/ngx-admin';
import {AdminComponent} from '@kiwi-suite/ngx-admin';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app.routing';

/**
 * register your custom data services here
 * see: https://stackoverflow.com/a/39085113/580651
 */
const DATA_SERVICES = [
    // MyResourceService,
];

/**
 * register your custom components here
 */
const APP_COMPONENTS = [
    // MyResourceListComponent,
    // MyResourceEditComponent,
    // MyResourceDetailComponent,
];

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
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
         * per default it takes the value at window.__kiwi and merges with given object
         */
        AdminModule.forRoot({
            environment: environment
        }),
    ],
    declarations: [
        ...APP_COMPONENTS,
    ],
    providers: [
        ...DATA_SERVICES
    ],
    bootstrap: [AdminComponent]
})
export class AppModule {
}
