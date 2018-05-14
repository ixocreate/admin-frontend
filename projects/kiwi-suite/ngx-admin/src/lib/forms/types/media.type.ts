import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'app-form-media',
    template: `
        <media-selector [formControl]="field.formControl"></media-selector>
    `,
})
export class MediaTypeComponent extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}
