import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {ProgressbarModule} from 'ngx-bootstrap';
import {AuthModule} from '../auth';
import {MediaModalListComponent, MediaSelectorComponent} from './components';
import {MediaEditComponent} from './media-edit.component';
import {MediaListComponent} from './media-list.component';
import {MediaRoutingModule} from './media-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
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
        MediaModalListComponent,
        MediaSelectorComponent,
    ],
    providers: [
        // UserResolver
    ],
    exports: [
        MediaModalListComponent,
        MediaSelectorComponent,
    ]
})
export class MediaModule {
}
