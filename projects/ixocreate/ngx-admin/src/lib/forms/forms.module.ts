import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesModule } from './types/types.module';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { FormlyWrapperFormFieldOnlyComponent } from './wrappers/form-field-only.wrapper';
import { FormlyWrapperSectionComponent } from './wrappers/section.wrapper';
import { FormlyWrapperTabComponent } from './wrappers/tab.wrapper';
import { FormlyWrapperTabsetComponent } from './wrappers/tabset.wrapper';
import { IXO_BOOTSTRAP_FORMLY_CONFIG } from './bootstrap.config';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

const COMPONENTS = [
  FormlyWrapperFormFieldComponent,
  FormlyWrapperFormFieldOnlyComponent,
  FormlyWrapperSectionComponent,
  FormlyWrapperTabComponent,
  FormlyWrapperTabsetComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    FormlyModule.forRoot(IXO_BOOTSTRAP_FORMLY_CONFIG),
    FormlyBootstrapModule,
    TypesModule,
    CommonModule
  ],
  exports: [
    TypesModule,
    ...COMPONENTS
  ]
})
export class FormsModule {
}
