import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AuthModule} from '../auth';
import {LinkSelectorComponent, LinkModalComponent} from "./components";
import {MediaModule} from "../media/media.module";
import {SitemapModalListItemComponent} from "../sitemap/sitemap-modal-list-item.component";
import {SitemapComponentModule} from "../sitemap/sitemap-component.module";

@NgModule({
    imports: [
        CommonModule,
        AuthModule,

        NgSelectModule,
        NgxDatatableModule,
        ReactiveFormsModule,

        MediaModule,
        SitemapComponentModule

    ],
    declarations: [
      LinkSelectorComponent,
      LinkModalComponent,
    ],
    providers: [
        // UserResolver
    ],
    exports: [
      LinkSelectorComponent
    ]
})
export class LinkModule {
}
