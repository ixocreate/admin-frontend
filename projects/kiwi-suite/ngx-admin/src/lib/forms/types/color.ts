import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-color',
  template: `
    <div class="input-group cursor-pointer" [(colorPicker)]="value" (colorPickerChange)="onSelect($event)" cpPosition="bottom"
         [cpPositionRelativeToArrow]="false">
      <div class="input-group-prepend">
        <span class="input-group-text" [class.p-0]="value">
          <i class="fa fa-fw fa-tint" *ngIf="!value"></i>
          <div class="color-picker-preview" [style.background]="value" *ngIf="value"></div>
        </span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="value" [class.is-invalid]="showError">
      <div class="input-group-append" #button>
        <button type="button" class="btn btn-outline-input" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError"
                (click)="remove()" kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldColorComponent extends CustomFieldTypeAbstract implements OnInit {
}
