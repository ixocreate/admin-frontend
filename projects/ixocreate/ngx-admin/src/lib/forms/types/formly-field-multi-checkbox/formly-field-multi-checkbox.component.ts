import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-multi-checkbox',
  templateUrl: './formly-field-multi-checkbox.component.html'
})
export class FormlyFieldMultiCheckboxComponent extends CustomFieldTypeAbstract implements OnInit {

  innerValues: { [key: string]: boolean } = {};

  ngOnInit() {
    super.ngOnInit();
    if (this.value === null) {
      this.setValue([]);
    }
    for (const option of this.to.options as any) {
      this.innerValues[option.value] = (this.value.indexOf(option.value) !== -1);
    }
  }

  setValue(value: any) {
    super.setValue(value);
    for (const key in this.innerValues) {
      if (this.innerValues.hasOwnProperty(key)) {
        this.innerValues[key] = (this.value.indexOf(key) !== -1);
      }
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
