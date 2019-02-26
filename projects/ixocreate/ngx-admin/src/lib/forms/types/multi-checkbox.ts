import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-multi-checkbox',
  template: `
    <div *ngFor="let option of to.options" class="d-flex align-items-center">
      <label class="switch switch-primary" [class.input-disabled]="to.disabled">
        <input type="checkbox" class="switch-input" [(ngModel)]="innerValues[option.value]" (change)="onToggleCheckbox()">
        <span class="switch-slider"></span>
      </label>
      <div class="ml-2">{{ option.label }}</div>
    </div>
  `,
})
export class FormlyFieldMultiCheckboxComponent extends CustomFieldTypeAbstract implements OnInit {

  innerValues: any[] = [];

  ngOnInit() {
    super.ngOnInit();
    if (this.value === null) {
      this.setValue([]);
    }
    for (const option of this.to.options as any) {
      this.innerValues[option.value] = (this.value.indexOf(option.value) !== -1);
    }
  }

  onToggleCheckbox() {
    const value = [];
    for (const key of Object.keys(this.innerValues)) {
      if (this.innerValues[key]) {
        value.push(key);
      }
    }
    this.setValue(value);
  }

}
