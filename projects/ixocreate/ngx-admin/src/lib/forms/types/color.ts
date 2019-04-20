import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-color',
  template: `
    <div class="input-group" [(colorPicker)]="value" (colorPickerChange)="onSelect($event)" cpPosition="bottom"
         [cpPositionRelativeToArrow]="false" [cpDisabled]="to.disabled" [class.cursor-pointer]="!to.disabled">
      <div class="input-group-prepend">
        <span class="input-group-text" [class.p-0]="value" [class.is-invalid]="showError">
          <i class="fa fa-fw fa-tint" *ngIf="!value"></i>
          <div class="color-picker-preview" [style.background]="value" *ngIf="value"></div>
        </span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="value" [class.is-invalid]="showError" [disabled]="to.disabled">
      <div class="input-group-append" #button *ngIf="!to.required && !to.disabled">
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError"
                (click)="remove()" ixoClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldColorComponent extends CustomFieldTypeAbstract implements OnInit {
}
