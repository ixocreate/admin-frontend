import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormlyBootstrapModule} from '../../forms/bootstrap';
import {AuthModule} from '../auth';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';
import {ResourceRoutingModule} from './resource-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        FormlyModule,
        FormlyBootstrapModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        ResourceRoutingModule,
    ],
    declarations: [
        ResourceDetailComponent,
        ResourceEditComponent,
        ResourceListComponent,
    ],
})
export class ResourceModule {
}
