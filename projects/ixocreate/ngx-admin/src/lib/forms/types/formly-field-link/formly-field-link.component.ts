import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { IxoLinkSelectModalComponent } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component';
import { LinkSelectModalData } from '../../../modals/ixo-link-select-modal/ixo-link-select-modal.component.model';

@Component({
  selector: 'formly-field-link',
  templateUrl: './formly-field-link.component.html'
})
export class FormlyFieldLinkComponent extends CustomFieldTypeAbstract implements OnInit {

  constructor(private modalService: BsModalService) {
    super();
  }

  get target() {
    if (this.value) {
      for (const targetType of IxoLinkSelectModalComponent.TARGET_TYPES) {
        if (targetType.name === this.value.target) {
          return targetType.label;
        }
      }
    }
    return ' - ';
  }

  get valueString() {
    if (this.value === null || !this.value.value) {
      return '';
    }
    let string = this.value.value.filename || this.value.value.name || this.value.value;
    if (this.value && this.value.value && this.value.value.locale) {
      string += ' (' + this.value.value.locale + ')';
    }
    return string;
  }

  get valueLink() {
    if (this.value === null) {
      return '';
    }
    switch (this.value.type) {
      case 'external':
        return this.value.value;
      case 'media':
        return this.value.link || this.value.value.original;
      default:
        return this.value.link || null;
    }
  }

  openModal() {
    if (this.to.disabled) {
      return;
    }
    const initialState: LinkSelectModalData = {
      value: this.value,
      onConfirm: (data) => {
        this.onSelect(data);
      },
    };
    this.modalService.show(IxoLinkSelectModalComponent, {class: 'modal-lg', initialState});
  }

}
