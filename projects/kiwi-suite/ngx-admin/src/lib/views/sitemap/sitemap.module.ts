import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {AuthModule} from '../auth';
import {SitemapListItemComponent} from './sitemap-list-item.component';
import {SitemapListComponent} from './sitemap-list.component';
import {SitemapRoutingModule} from './sitemap-routing.module';
import {SitemapListContainerComponent} from "./sitemap-list-container.component";
import {SitemapCreateComponent} from "./sitemap-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "../../forms/bootstrap.module";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthModule,
        NgxDnDModule,
        SitemapRoutingModule,
        FormlyModule,
        FormlyBootstrapModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    declarations: [
        SitemapListComponent,
        SitemapListItemComponent,
        SitemapListContainerComponent,
        SitemapCreateComponent,
    ],
    providers: [
        // UserResolver
    ]
})
export class SitemapModule {
}
