import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { QuillEditorComponent } from 'ngx-quill';
import { CustomValidators } from '../../validators/CustomValidators';
import { LinkSelectModalData } from '../../modals/kiwi-link-select-modal/link-select-modal-data.interface';
import { KiwiLinkSelectModalComponent } from '../../modals/kiwi-link-select-modal/kiwi-link-select-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { IxoLinkType } from '../../lib/quill/quill-extentions';

@Component({
  selector: 'formly-field-quill',
  template: `
    <quill-editor #editor
                  [ngModel]="quillDelta"
                  format="object"
                  [style]="{height: height}"
                  [readOnly]="to.disabled"
                  [modules]="modules"
                  [placeholder]="to.placeholder"
                  [required]="to.required"
                  [class.is-invalid]="showError"
                  [class.read-only]="to.disabled"
                  (onContentChanged)="onContentChanged($event)">
    </quill-editor>
  `,
})
export class FormlyFieldQuillComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  quillDelta = {};

  @ViewChild('editor') editor: QuillEditorComponent;

  constructor(private modalService: BsModalService) {
    super();
  }

  get modules() {
    return this.to.modules;
  }

  get height() {
    return this.to.height + 'px';
  }

  ngOnInit() {
    if (this.to.required) {
      this.formControl.setValidators([CustomValidators.quillRequired]);
    }
    if (this.formControl.value && this.formControl.value.quill) {
      this.quillDelta = this.formControl.value.quill;
    }
    setTimeout(() => {
      this.setValue(this.formControl.value || {html: '', quill: []});
    });
    this.to.modules.keyboard = {
      bindings: {
        smartbreak: {
          key: 13,
          shiftKey: true,
          handler(range, context) {
            this.quill.setSelection(range.index, 'silent');
            this.quill.insertText(range.index, '\n', 'user');
            this.quill.setSelection(range.index + 1, 'silent');
            this.quill.format('linebreak', true, 'user');
          },
        },
        paragraph: {
          key: 13,
          handler(range, context) {
            this.quill.setSelection(range.index, 'silent');
            this.quill.insertText(range.index, '\n', 'user');
            this.quill.setSelection(range.index + 1, 'silent');
            const f = this.quill.getFormat(range.index + 1);
            if (f.hasOwnProperty('linebreak')) {
              delete (f.linebreak);
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

    if (!this.to.modules.handlers) {
      this.to.modules.toolbar.handlers = {};
    }

    this.to.modules.toolbar.handlers.ixolink = (value) => {
      if (value) {
        this.openLinkModal();
      } else {
        this.editor.quillEditor.format('ixolink', false, 'user');
      }
    };


    setTimeout(() => {
      const quill = this.editor.quillEditor;
      console.log(quill);
      quill.on('selection-change', (range, oldRange, source) => {
        if (range === null) {
          return;
        }
        if (range.length === 0 && source === 'user') {
          const [link, offset] = quill.scroll.descendant(IxoLinkType, range.index);
          if (link !== null) {
            quill.setSelection({
              index: range.index - offset,
              length: link.length(),
            });
            this.openLinkModal(link.getData());
            return;
          }
        }
      });
    });
  }

  openLinkModal(value: any = null) {
    const initialState: LinkSelectModalData = {
      value,
      onConfirm: (data) => {
        if (data) {
          this.editor.quillEditor.format('ixolink', data, 'user');
        } else {
          this.editor.quillEditor.format('ixolink', false, 'user');
        }
      },
    };
    this.modalService.show(KiwiLinkSelectModalComponent, {class: 'modal-lg', initialState});
  }

  onContentChanged(data: any) {
    this.formControl.markAsTouched();
    this.setValue({html: data.html, quill: data.content});
  }

}
