import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ToastrModule} from 'ngx-toastr';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';
import {ResourcesRoutingModule} from './resource-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        ResourcesRoutingModule,
        ToastrModule.forRoot(),
    ],
    declarations: [
        ResourceDetailComponent,
        ResourceEditComponent,
        ResourceListComponent,
    ]
})
export class ResourceModule {
}
