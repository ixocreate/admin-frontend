import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { QuillEditorComponent } from 'ngx-quill';
import { CustomValidators } from '../../../validators/custom-validators';
import { LinkSelectModalData } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component.model';
import { IxoLinkSelectModalComponent } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IxoLinkType } from '../../../lib/quill/quill-extentions';

@Component({
  selector: 'formly-field-quill',
  templateUrl: './formly-field-quill.component.html'
})
export class FormlyFieldQuillComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  quillDelta = {};

  @ViewChild('editor') editor: QuillEditorComponent;

  constructor(private element: ElementRef, private modalService: BsModalService) {
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
      /**
       * default to html value if no quill delta is set
       */
      if(!this.formControl.value.quill || !this.formControl.value.quill.ops || this.formControl.value.quill.ops.length === 0) {
        if(this.formControl.value.html) {
          this.editor.quillEditor.clipboard.dangerouslyPasteHTML(this.formControl.value.html);
        }
      }
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
            // workaround for modal not workin when called here
            const event = new CustomEvent('open-modal', {detail: {value: link.getData()}});
            this.element.nativeElement.dispatchEvent(event);
            return;
          }
        }
        quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          delta.ops = delta.ops.map((op) => {
            const opsData: any = {
              insert: op.insert.replace(/\n\s*\n/g, '\n'),
            };
            if (op.attributes) {
              const filteredAttributes = {};
              const allowedAttributes = ['header', 'linebreak'];
              for (const attribute of allowedAttributes) {
                if (op.attributes[attribute]) {
                  filteredAttributes[attribute] = op.attributes[attribute];
                }
              }
              if (Object.keys(filteredAttributes).length) {
                opsData.attributes = filteredAttributes;
              }
            }
            return opsData;
          });
          return delta;
        });
      });
      this.element.nativeElement.addEventListener('open-modal', (event: CustomEvent) => {
        this.openLinkModal(event.detail.value);
      }, false);
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
    this.modalService.show(IxoLinkSelectModalComponent, {class: 'modal-lg', initialState});
  }

  onContentChanged(data: any) {
    this.formControl.markAsTouched();
    this.setValue({html: data.html, quill: data.content});
  }

}
