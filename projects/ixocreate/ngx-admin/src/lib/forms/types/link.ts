import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { KiwiLinkSelectModalComponent } from '../../modals/kiwi-link-select-modal/kiwi-link-select-modal.component';
import { LinkSelectModalData } from '../../modals/kiwi-link-select-modal/link-select-modal-data.interface';

@Component({
  selector: 'formly-field-link',
  template: `
    <div class="input-group" (click)="openModal()" [class.cursor-pointer]="!to.disabled">
      <div class="input-group-prepend">
        <span class="input-group-text" *ngIf="!value" [class.is-invalid]="showError"><i class="fa fa-fw fa-link"></i></span>
        <a [href]="valueLink" target="_blank" class="input-group-text" *ngIf="value" kiwiClickStopPropagation
           [class.is-invalid]="showError">
          <i class="fa fa-fw fa-link"></i>
        </a>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="valueString" [placeholder]="to.placeholder"
             [class.is-invalid]="showError" [disabled]="to.disabled">
      <div class="input-group-append">
        <span class="input-group-text d-none d-sm-block" *ngIf="value" [class.is-invalid]="showError">{{ target }}</span>
        <span class="input-group-text" *ngIf="value" [class.is-invalid]="showError">{{ value.type || '-' }}</span>
        <button *ngIf="!to.required && !to.disabled" type="button" class="btn" [class.btn-outline-input]="!showError"
                [class.btn-outline-danger]="showError" (click)="remove()" kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldLinkComponent extends CustomFieldTypeAbstract implements OnInit {

  constructor(private modalService: BsModalService) {
    super();
  }

  get target() {
    if (this.value) {
      for (const targetType of KiwiLinkSelectModalComponent.TARGET_TYPES) {
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
    return this.value.value.filename || this.value.value.name || this.value.value;
  }

  get valueLink() {
    if (this.value === null) {
      return '';
    }
    switch (this.value.type) {
      case 'external':
        return this.value.value;
      case 'sitemap':
        return this.value.link;
      case 'media':
        return this.value.link || this.value.value.original;
      default:
        return null;
    }
  }

  openModal() {
    if (this.to.disabled) {
      return;
    }
    const initialState: LinkSelectModalData = {
      value: this.value,
      onConfirm: (data) => {
        console.log(data);
        this.onSelect(data);
      },
    };
    if (this.value && this.value.type) {
      initialState.selectedType = this.value.type;
    }
    this.modalService.show(KiwiLinkSelectModalComponent, {class: 'modal-lg', initialState});
  }

}
