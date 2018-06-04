import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {TabsModule} from 'ngx-bootstrap';
import {AuthModule} from '../auth';
import {SitemapListComponent, SitemapListContainerComponent, SitemapListItemComponent} from './components';
import {SitemapCreateComponent} from './sitemap-create.component';
import {SitemapEditComponent} from './sitemap-edit.component';
import {SitemapIndexComponent} from './sitemap-index.component';
import {SitemapRoutingModule} from './sitemap-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        FormlyModule,
        // FormlyBootstrapModule,
        FormsModule,
        NgSelectModule,
        NgxDnDModule,
        ReactiveFormsModule,
        SitemapRoutingModule,
        TabsModule
    ],
    declarations: [
        SitemapCreateComponent,
        SitemapEditComponent,
        SitemapIndexComponent,
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
