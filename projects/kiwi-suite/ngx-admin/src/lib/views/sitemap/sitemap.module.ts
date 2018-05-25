import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {AuthModule} from '../auth';
import {SitemapListItemComponent} from './sitemap-list-item.component';
import {SitemapListComponent} from './sitemap-list.component';
import {SitemapRoutingModule} from './sitemap-routing.module';
import {SitemapListContainerComponent} from "./sitemap-list-container.component";

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        NgxDnDModule,
        SitemapRoutingModule,
    ],
    declarations: [
        SitemapListComponent,
        SitemapListItemComponent,
        SitemapListContainerComponent,
    ],
    providers: [
        // UserResolver
    ]
})
export class SitemapModule {
}
