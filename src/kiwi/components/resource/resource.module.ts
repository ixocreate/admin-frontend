import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';
import {ResourcesRoutingModule} from './resource-routing.module';
import {ToastrModule} from "ngx-toastr";

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        ResourcesRoutingModule,
        ToastrModule.forRoot(),
    ],
    declarations: [
        ResourceDetailComponent,
        ResourceEditComponent,
        ResourceListComponent,
    ],
})
export class ResourcesModule {
}
