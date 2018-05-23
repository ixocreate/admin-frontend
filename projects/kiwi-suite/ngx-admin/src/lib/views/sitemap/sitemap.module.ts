import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SitemapListComponent} from "./sitemap-list.component";
import {NgxDnDModule} from "@swimlane/ngx-dnd";
import {SitemapListItemComponent} from "./sitemap-list-item.component";

@NgModule({
    imports: [
        CommonModule,
        NgxDnDModule,
    ],
    declarations: [
        SitemapListComponent,
        SitemapListItemComponent,
    ],
    providers: [
        // UserResolver
    ]
})
export class SitemapModule {
}
