import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {ProgressbarModule} from 'ngx-bootstrap';
import {AuthModule} from '../auth';
import {MediaListComponent, MediaSelectorComponent} from './components';
import {MediaEditComponent} from './media-edit.component';
import {MediaIndexComponent} from './media-index.component';
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
        MediaIndexComponent,
        MediaListComponent,
        MediaSelectorComponent,
    ],
    providers: [
        // UserResolver
    ],
    exports: [
        MediaListComponent,
        MediaSelectorComponent,
    ]
})
export class MediaModule {
}
