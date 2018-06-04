import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TabsModule} from 'ngx-bootstrap';
import {AuthModule} from '../auth';
import {MediaModule} from '../media';
import {SitemapModule} from '../sitemap';
import {LinkModalComponent, LinkSelectorComponent} from './components';
import {SitemapModalListItemComponent} from './components/sitemap-modal-list-item.component';
import {SitemapModalListComponent} from './components/sitemap-modal-list.component';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        FormsModule,
        MediaModule,
        NgSelectModule,
        SitemapModule,
        TabsModule
    ],
    declarations: [
        LinkSelectorComponent,
        LinkModalComponent,
        SitemapModalListComponent,
        SitemapModalListItemComponent,
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
