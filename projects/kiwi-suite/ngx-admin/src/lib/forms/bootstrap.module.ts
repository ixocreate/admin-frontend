import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormlyModule} from '@ngx-formly/core';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {QuillModule} from 'ngx-quill';
import {MediaModule} from '../views/media';
import {BOOTSTRAP_FORMLY_CONFIG, FIELD_TYPE_COMPONENTS} from './bootstrap.config';

@NgModule({
    declarations: FIELD_TYPE_COMPONENTS,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(BOOTSTRAP_FORMLY_CONFIG),
        MediaModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        QuillModule,
    ],
})
export class FormlyBootstrapModule {
}
