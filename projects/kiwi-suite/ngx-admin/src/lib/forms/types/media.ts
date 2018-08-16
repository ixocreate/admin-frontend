import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-media',
    template: `
        <media-selector [formControl]="field.formControl"></media-selector>
    `,
})
export class FormlyFieldMedia extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}
