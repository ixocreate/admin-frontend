import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-link',
    template: `<link-selector></link-selector>`,
})
export class FormlyFieldLink extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}
