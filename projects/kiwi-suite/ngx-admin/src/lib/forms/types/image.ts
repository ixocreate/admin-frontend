import { Component, TemplateRef } from '@angular/core';
import {FormlyFieldMediaComponent} from "./media";

@Component({
  selector: 'formly-field-image',
  template: `
    <div class="input-group cursor-pointer" (click)="openModal(modalTemplate)">
      <div class="input-group-prepend">
        <span class="input-group-text p-0" [class.is-invalid]="showError">
          <div class="input-media-preview" *ngIf="!value"><i class="fa fa-fw fa-file-o"></i></div>
          <ng-container *ngIf="value">
            <ng-container *ngIf="isImage(value.mimeType); else noImage">
              <a [href]="value.original" target="_blank" class="input-media-preview"
                 [style.backgroundImage]="'url(' + value.thumb + ')'" kiwiClickStopPropagation></a>
            </ng-container>
            <ng-template #noImage class="media-container">
              <a [href]="value.original" target="_blank" class="input-media-preview" kiwiClickStopPropagation>
                <i [class]="'fa fa-fw ' + mimeTypeIcon(value.mimeType)"></i>
              </a>
            </ng-template>
          </ng-container>
        </span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="value?.filename" [placeholder]="to.placeholder"
             [class.is-invalid]="showError">
      <div class="input-group-append">
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()"
                kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>

    <ng-template #modalTemplate>
      <kiwi-media-list (select)="onSelect($event)" [showTypeFilter]="false" selectedType="image"></kiwi-media-list>
    </ng-template>
  `,
})
export class FormlyFieldImageComponent extends FormlyFieldMediaComponent {

}
