import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MediaModule} from '../views/media';
import {BOOTSTRAP_FORMLY_CONFIG, FIELD_TYPE_COMPONENTS} from './bootstrap.config';

@NgModule({
    declarations: FIELD_TYPE_COMPONENTS,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(BOOTSTRAP_FORMLY_CONFIG),
        MediaModule,
    ],
})
export class FormlyBootstrapModule {
}
