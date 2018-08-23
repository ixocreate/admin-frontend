import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-color',
  template: `
    <div class="input-group">
      <div class="input-group-prepend">
        <p-colorPicker [(ngModel)]="value" class="form-color-picker"></p-colorPicker>
      </div>
      <input type="text" class="form-control" [value]="value || ''" (change)="inputValue($event)" [class.is-invalid]="showError">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-input" (click)="remove()">
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
  `,
})
export class FormlyFieldColorComponent extends CustomFieldTypeAbstract implements OnInit {

  private colorRegex = RegExp('#[0-9A-Fa-f]{6}');

  inputValue(event: any) {
    const value = event.target.value;
    if (value !== null && value !== '' && this.colorRegex.test(value)) {
      return this.setValue(value);
    }
    event.target.value = null;
    this.setValue(null);
  }

}
