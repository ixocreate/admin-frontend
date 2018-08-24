import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <label class="switch switch-primary">
      <input type="checkbox" class="switch-input" [(ngModel)]="value">
      <span class="switch-slider"></span>
    </label>
  `,
})
export class FormlyFieldCheckboxComponent extends CustomFieldTypeAbstract implements OnInit {
}
