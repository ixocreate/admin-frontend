import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { QuillEditorComponent } from 'ngx-quill';
import * as Quill from 'quill';
import { CustomValidators } from '../../../validators/custom-validators';
import { LinkSelectModalData } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component.model';
import { IxoLinkSelectModalComponent } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IxoLinkType } from '../../../lib/quill/quill-extentions';
import { handleQuillModules } from './handle-quill-modules';

const Delta = Quill.import('delta');

@Component({
  selector: 'formly-field-quill',
  templateUrl: './formly-field-quill.component.html',
})
export class FormlyFieldQuillComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  quillDelta = {};
  quillEditor: any = null;

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
      this.editor.quillEditor.history.clear();
      /**
       * default to html value if no quill delta is set
       */
      if (!this.formControl.value.quill || !this.formControl.value.quill.ops || this.formControl.value.quill.ops.length === 0) {
        if (this.formControl.value.html) {
          this.editor.quillEditor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
            if (node.tagName === 'A') {
              const href = node.getAttribute('href');
              const target = node.getAttribute('target');
              return delta.compose(new Delta().retain(delta.length(), {
                ixolink: {
                  type: 'external',
                  target,
                  value: href,
                }
              }));
            }
            return delta;
          });
          this.editor.quillEditor.clipboard.dangerouslyPasteHTML(this.formControl.value.html);
        }
      }
    });

    handleQuillModules(this.to.modules, () => this.editor, this.openLinkModal.bind(this));

    setTimeout(() => {
      const quill = this.editor.quillEditor;
      this.quillEditor = quill;
      quill.on('selection-change', (range, oldRange, source) => {
        if (range === null) {
          return;
        }
        quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          delta.ops = delta.ops.map((op) => {
            const opsData: any = {
              insert: op.insert.replace(/\n\s*\n/g, '\n'),
            };
            if (op.attributes) {
              const filteredAttributes = {};
              const allowedAttributes = ['header', 'linebreak', 'bold', 'italic'];
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
    });

    /**
     * The toolbar of the quill WYSIWYG Editor should be changed to by what the backend gives us
     * So we override the globally defined toolbar
     */
    // this.to.modules.toolbar = undefined;
  }

  openLinkModal() {
    let value = null;
    const selection = this.quillEditor.getSelection();
    const [link, offset] = this.quillEditor.scroll.descendant(IxoLinkType, selection.index);
    if (link !== null) {
      this.quillEditor.setSelection({
        index: selection.index - offset,
        length: link.length(),
      });
      value = link.getData();
    }

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
