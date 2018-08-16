import { Component, forwardRef, OnInit, TemplateRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MediaHelper } from '../../helpers/media.helper';
import { Media } from '../../interfaces/media.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'formly-field-media',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormlyFieldMediaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="media-container-max-width-container">
      <div class="media-container media-container-max-width" (click)="openModal(modalTemplate)">
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-empty',
    });
  }

  remove() {
    this.setValue(null);
  }

  onSelect(media: Media) {
    this.modalRef.hide();
    this.setValue(media);
  }

  isImage(mimeType: string): boolean {
    return MediaHelper.isImage(mimeType);
  }

  isSVG(mimeType: string): boolean {
    return MediaHelper.isSVG(mimeType);
  }

  mimeTypeIcon(mimeType: string): string {
    return MediaHelper.mimeTypeIcon(mimeType);
  }
}
