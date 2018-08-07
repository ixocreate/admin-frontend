import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-quill',
    template: `
        <quill-selector
                      [formControl]="field.formControl"
                      [height]="height"
                      [modules]="modules">
        </quill-selector>
    `,
})
export class FormlyFieldQuill extends FieldType {

    get modules() {
        return this.to.modules;
    }

    get height() {
        return this.to.height;
    }
}
