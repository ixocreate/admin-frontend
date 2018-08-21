import { Component, OnInit, TemplateRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MediaHelper } from '../../helpers/media.helper';
import { Media } from '../../interfaces/media.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'formly-field-media',
  template: `
    <div class="media-container-max-width-container">
      <div class="media-container media-container-max-width" (click)="openModal(modalTemplate)" [class.is-invalid]="showError">
        <ng-container *ngIf="!media; else hasMedia">
          <div class="media-icon">
            <span class="file-icon fa fa-5x fa-fw fa-plus"></span>
          </div>
          <div class="media-image-title">
            <div>no file selected</div>
          </div>
        </ng-container>
        <ng-template #hasMedia>
          <button (click)="remove($event)" kiwiClickStopPropagation class="btn-media-remove"><i class="fa fa-close"></i></button>
          <ng-container *ngIf="isImage(media.mimeType); else noImage">
            <div class="media-image" [ngStyle]="{backgroundImage: 'url(' + media.thumb + ')'}"></div>
            <div class="media-image-title">
              <div>{{ media.filename }}</div>
            </div>
          </ng-container>
          <ng-template #noImage class="media-container">
            <div class="media-icon">
              <span [class]="'file-icon fa fa-5x fa-fw ' + mimeTypeIcon(media.mimeType)"></span>
            </div>
            <div class="media-image-title">
              <div>{{ media.filename }}</div>
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
export class FormlyFieldMediaComponent extends FieldType implements OnInit {

  media: Media;
  modalRef: BsModalRef;

  isImage = MediaHelper.isImage;
  isSVG = MediaHelper.isSVG;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(protected modalService: BsModalService) {
    super();
  }

  ngOnInit() {
    this.setValue(this.formControl.value);
  }

  setValue(media: Media) {
    this.media = media;
    this.formControl.setValue(media);
  }

  remove() {
    this.setValue(null);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg modal-empty'});
  }

  onSelect(media: Media) {
    this.modalRef.hide();
    this.setValue(media);
  }
}
