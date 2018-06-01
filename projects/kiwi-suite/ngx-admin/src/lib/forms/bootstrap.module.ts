import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {QuillModule} from 'ngx-quill';
import {LinkModule} from "../views/link";
import {MediaModule} from '../views/media';
import {BOOTSTRAP_FORMLY_CONFIG, FIELD_TYPE_COMPONENTS} from './bootstrap.config';

@NgModule({
    declarations: FIELD_TYPE_COMPONENTS,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(BOOTSTRAP_FORMLY_CONFIG),
        LinkModule,
        MediaModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        NgxDnDModule,
        QuillModule,
    ],
})
export class FormlyBootstrapModule {
}
