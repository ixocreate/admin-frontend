import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-radio',
  template: `
    <div [formGroup]="form">
      <div *ngFor="let option of to.options; let i = index;" class="radio">
        <label class="custom-control custom-radio">
          <input
            [name]="id"
            [id]="id + '_' + i"
            type="radio"
            [value]="option.label ? option.value : option.key"
            [formControl]="formControl"
            [formlyAttributes]="field" class="custom-control-input">

          <span class="custom-control-label">{{ option.label ? option.label : option.value }}</span>
          <span class="custom-control-indicator"></span>
        </label>
      </div>
    </div>
  `,
})
export class FormlyFieldRadio extends FieldType {}
