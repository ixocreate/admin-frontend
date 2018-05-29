import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {FormlyBootstrapModule} from '../../forms/bootstrap.module';
import {AuthModule} from '../auth';
import {SitemapCreateComponent} from './sitemap-create.component';
import {SitemapEditComponent} from './sitemap-edit.component';
import {SitemapListContainerComponent} from './sitemap-list-container.component';
import {SitemapListItemComponent} from './sitemap-list-item.component';
import {SitemapListComponent} from './sitemap-list.component';
import {SitemapRoutingModule} from './sitemap-routing.module';

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
        SitemapCreateComponent,
        SitemapEditComponent,
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
