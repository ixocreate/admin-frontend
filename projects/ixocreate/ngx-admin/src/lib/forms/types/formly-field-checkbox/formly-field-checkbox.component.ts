import { Component, OnInit } from '@angular/core';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

@Component({
  selector: 'formly-field-checkbox',
  templateUrl: './formly-field-checkbox.component.html'
})
export class FormlyFieldCheckboxComponent extends CustomFieldTypeAbstract implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    if (this.value === null) {
      this.setValue(false);
    }
  }

}
