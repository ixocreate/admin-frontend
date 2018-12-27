import { OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

export class CustomFieldTypeAbstract extends FieldType implements OnInit {

  value: any;

  ngOnInit() {
    this.setValue(this.formControl.value);
  }

  setValue(value: any) {
    this.value = value;
    this.formControl.setValue(value);
  }

  remove() {
    this.formControl.markAsTouched();
    this.setValue(null);
  }

  onSelect(value: any) {
    this.setValue(value);
  }

}
