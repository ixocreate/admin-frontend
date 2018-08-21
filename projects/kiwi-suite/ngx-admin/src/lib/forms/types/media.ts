import { Component, TemplateRef } from '@angular/core';
import { MediaHelper } from '../../helpers/media.helper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'formly-field-media',
  template: `
    <div class="media-container-max-width-container">
      <div class="media-container media-container-max-width" (click)="openModal(modalTemplate)" [class.is-invalid]="showError">
        <ng-container *ngIf="!value; else hasMedia">
          <div class="media-icon">
            <span class="file-icon fa fa-4x fa-fw fa-plus"></span>
          </div>
          <div class="media-image-title">
            <div>no file selected</div>
          </div>
        </ng-container>
        <ng-template #hasMedia>
          <button (click)="remove($event)" kiwiClickStopPropagation class="btn-media-remove"><i class="fa fa-close"></i></button>
          <ng-container *ngIf="isImage(value.mimeType); else noImage">
            <div class="media-image" [ngStyle]="{backgroundImage: 'url(' + value.thumb + ')'}"></div>
            <div class="media-image-title">
              <div>{{ value.filename }}</div>
            </div>
          </ng-container>
          <ng-template #noImage class="media-container">
            <div class="media-icon">
              <span [class]="'file-icon fa fa-4x fa-fw ' + mimeTypeIcon(value.mimeType)"></span>
            </div>
            <div class="media-image-title">
              <div>{{ value.filename }}</div>
            </div>
          </ng-template>
        </ng-template>
      </div>
    </div>

    <ng-template #modalTemplate>
      <kiwi-media-list (select)="onSelect($event)"></kiwi-media-list>
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
    this.modalRef = this.modalService.show(template, {class: 'modal-lg modal-empty'});
  }

  onSelect(value: any) {
    this.modalRef.hide();
    super.setValue(value);
  }
}
