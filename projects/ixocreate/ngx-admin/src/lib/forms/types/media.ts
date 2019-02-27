import { Component, TemplateRef } from '@angular/core';
import { MediaHelper } from '../../helpers/media.helper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'formly-field-media',
  template: `
    <div class="input-group" (click)="openModal(modalTemplate)" [class.cursor-pointer]="!to.disabled">
      <div class="input-group-prepend">
        <span class="input-group-text p-0" [class.is-invalid]="showError">
          <div class="input-media-preview" *ngIf="!value"><i class="fa fa-fw fa-file-o"></i></div>
          <ng-container *ngIf="value">
            <ng-container *ngIf="isImage(value.mimeType); else noImage">
              <span class="transparent-img-bg">
                <a [href]="value.original" target="_blank" class="input-media-preview"
                   [style.backgroundImage]="'url(' + value.thumb + ')'" ixoClickStopPropagation></a>
              </span>
            </ng-container>
            <ng-template #noImage class="media-container">
              <a [href]="value.original" target="_blank" class="input-media-preview" ixoClickStopPropagation>
                <i [class]="'fa fa-fw ' + mimeTypeIcon(value.mimeType)"></i>
              </a>
            </ng-template>
          </ng-container>
        </span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="value?.filename" [placeholder]="to.placeholder"
             [class.is-invalid]="showError" [disabled]="to.disabled">
      <div class="input-group-append" *ngIf="!to.required && !to.disabled">
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()"
                ixoClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>

    <ng-template #modalTemplate>
      <div class="current-media is-top" *ngIf="value">
        <div class="row align-items-center">
          <div class="col-auto text-center">
            <ng-container *ngIf="isImage(value.mimeType); else noImage"><img [src]="value.thumb" class="img-fluid"/></ng-container>
            <ng-template #noImage class="media-container"><i [class]="'fa fa-2x fa-fw ' + mimeTypeIcon(value.mimeType)"></i></ng-template>
          </div>
          <div class="col">
            <b>Current File:</b><br/>
            {{ value.filename }}
          </div>
        </div>
      </div>
      <ixo-media-list (select)="onSelect($event)" [showTypeFilter]="!to.type" [selectedType]="to.type"></ixo-media-list>
    </ng-template>
  `,
})
export class FormlyFieldMediaComponent extends CustomFieldTypeAbstract {

  value: Media;
  modalRef: BsModalRef;

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(protected modalService: BsModalService) {
    super();
  }

  openModal(template: TemplateRef<any>) {
    if (this.to.disabled) {
      return;
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-lg modal-empty'});
  }

  onSelect(value: any) {
    this.modalRef.hide();
    super.setValue(value);
  }
}
