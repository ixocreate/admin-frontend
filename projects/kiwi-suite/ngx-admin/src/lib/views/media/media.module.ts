import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {ProgressbarModule} from 'ngx-bootstrap';
import {MediaEditComponent} from './media-edit.component';
import {MediaListComponent} from './media-list.component';
import {MediaRoutingModule} from './media-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        MediaRoutingModule,
        NgSelectModule,
        NgxDatatableModule,
        ProgressbarModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MediaEditComponent,
        MediaListComponent,
    ],
    providers: [
        // UserResolver
    ]
})
export class MediaModule {
}
