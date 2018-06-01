import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {TabsModule} from 'ngx-bootstrap';
import {AuthModule} from '../auth';
import {MediaModule} from '../media';
import {LinkModalComponent, LinkSelectorComponent} from './components';
import {SitemapModalListItemComponent} from './components/sitemap-modal-list-item.component';
import {SitemapModalListComponent} from './components/sitemap-modal-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthModule,
        MediaModule,
        NgxDnDModule,
        FormlyModule,
        ReactiveFormsModule,
        NgSelectModule,
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
