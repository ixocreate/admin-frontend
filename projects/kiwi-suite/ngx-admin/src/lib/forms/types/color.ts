import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-color',
    template: `
    <color-selector [formControl]="field.formControl" [colorLabel]="to.label"></color-selector>
  `,
})
export class FormlyFieldColor extends FieldType {

}
