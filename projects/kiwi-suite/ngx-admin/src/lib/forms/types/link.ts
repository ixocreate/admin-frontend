import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-link',
    template: `...`,
})
export class FormlyFieldLinkComponent extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}
