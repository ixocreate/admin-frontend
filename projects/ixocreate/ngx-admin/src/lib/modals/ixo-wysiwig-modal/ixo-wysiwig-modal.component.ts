import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillData } from './ixo-wysiwig-modal.component.model';
import { IxoLinkType } from '../../lib/quill/quill-extentions';
import { LinkSelectModalData } from '../ixo-link-select-modal/ixo-link-select-modal.component.model';
import { IxoLinkSelectModalComponent } from '../ixo-link-select-modal/ixo-link-select-modal.component';
import { handleQuillModules } from '../../forms/types/formly-field-quill/handle-quill-modules';
import { quillModules } from '../../forms/quill-modules.config';

@Component({
  selector: 'ixo-wysiswig-modal',
  templateUrl: './ixo-wysiwig-modal.component.html',
})
export class IxoWysiwigModalComponent implements OnInit {

  @ViewChild('editor') editor: QuillEditorComponent;
  value: QuillData | null = null;

  quillDelta = {ops: [{retain: 2}, {retain: 10, attributes: {bold: true}}]};
  public modules: any;
  public showBackdrop = false;
  public editorVisible = false;

  public currentQuill: QuillData = {
    html: '',
    quill: {},
  };

  onConfirm = (data: QuillData) => {
  };

  constructor(private element: ElementRef, private modalService: BsModalService, public bsModalRef: BsModalRef) {
  }

  public onContentChanged(event) {
    this.currentQuill = {
      html: event.html,
      quill: event.content,
    };
  }

  ngOnInit() {
    this.modules = handleQuillModules(quillModules, () => this.editor, this.openLinkModal.bind(this));

    if (this.value) {
      this.quillDelta = this.value.quill;
    }

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
            // workaround for modal not working when called here
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
      this.element.nativeElement.addEventListener('open-modal', (event: CustomEvent) => {
        this.openLinkModal(event.detail.value);
      }, false);
    });

    /**
     * The toolbar of the quill WYSIWYG Editor should be changed to by what the backend gives us
     * So we override the globally defined toolbar
     */
    // this.to.modules.toolbar = undefined;
  }

  openLinkModal(value: any = null) {
    const initialState: LinkSelectModalData = {
      value,
      onConfirm: (data) => {
        this.showBackdrop = false;
        if (data) {
          this.editor.quillEditor.format('ixolink', data, 'user');
        } else {
          this.editor.quillEditor.format('ixolink', false, 'user');
        }
      },
    };
    this.showBackdrop = true;
    this.modalService.show(IxoLinkSelectModalComponent, {class: 'modal-lg', initialState});
    this.modalService.onHide.subscribe(() => {
      this.showBackdrop = false;
    });
  }

  confirm() {
    if (!this.currentQuill.html || this.currentQuill.html === '') {
      this.onConfirm(null);
    } else {
      this.onConfirm(this.currentQuill);
    }
    this.bsModalRef.hide();
  }
}
