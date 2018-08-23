import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'formly-field-quill',
  template: `
    <quill-editor #editor
                  [ngModel]="value?.html"
                  [style]="{height: height}"
                  [modules]="modules"
                  (onContentChanged)="onContentChanged($event)">
    </quill-editor>
  `,
})
export class FormlyFieldQuillComponent extends CustomFieldTypeAbstract implements OnInit {

  value = {html: '', quill: []};

  @ViewChild('editor') editor: QuillEditorComponent;

  get modules() {
    return this.to.modules;
  }

  get height() {
    return this.to.height + 'px';
  }

  ngOnInit() {
    setTimeout(() => {
      this.setValue(this.formControl.value || {html: '', quill: []});
    });
    this.to.modules.keyboard = {
      bindings: {
        smartbreak: {
          key: 13,
          shiftKey: true,
          handler: function (range, context) {
            this.quill.setSelection(range.index, 'silent');
            this.quill.insertText(range.index, '\n', 'user');
            this.quill.setSelection(range.index + 1, 'silent');
            this.quill.format('linebreak', true, 'user');
          },
        },
        paragraph: {
          key: 13,
          handler: function (range, context) {
            this.quill.setSelection(range.index, 'silent');
            this.quill.insertText(range.index, '\n', 'user');
            this.quill.setSelection(range.index + 1, 'silent');
            const f = this.quill.getFormat(range.index + 1);
            if (f.hasOwnProperty('linebreak')) {
              delete(f.linebreak);
              this.quill.removeFormat(range.index + 1);
              for (const key in f) {
                if (f.hasOwnProperty(key)) {
                  this.quill.formatText(range.index + 1, key, f[key]);
                }
              }
            }
          },
        },
      },
    };
  }

  onContentChanged(data: any) {
    console.log(data);
    this.setValue({html: data.html, quill: data.content});
  }

}
