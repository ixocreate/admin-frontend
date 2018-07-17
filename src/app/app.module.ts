import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AdminComponent, AdminModule} from '@kiwi-suite/ngx-admin';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app.routing';

/**
 * register your custom data services here
 */
const DATA_SERVICES = [

];

/**
 * register your custom components here
 */
const APP_COMPONENTS = [

];

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
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
