import {Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {QuillEditorComponent} from 'ngx-quill';

@Component({
    selector: 'formly-field-quill',
    template: `
        <quill-editor #editor
                      [formControl]="formControl"
                      [style]="{height: height+'px'}"
                      [modules]="modules"
                      [class.is-invalid]="showError"
                      [formlyAttributes]="field">
        </quill-editor>
    `,
})
export class FormlyFieldQuill extends FieldType {
    @ViewChild('editor') editor: QuillEditorComponent;

    get modules() {
        return this.to.modules;
    }

    get height() {
        return this.to.height;
    }
}
