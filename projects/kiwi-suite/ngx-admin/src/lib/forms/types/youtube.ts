import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-youtube',
    template: `<youtube-selector [formControl]="field.formControl"></youtube-selector>`,
})
export class FormlyFieldYouTube extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}
