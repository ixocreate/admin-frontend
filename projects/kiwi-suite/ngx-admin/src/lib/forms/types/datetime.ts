import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-datetime',
  template: `
      <input class="form-control"
             [formlyAttributes]="field"
             [formControl]="formControl"
             [bsConfig]="config"
             bsDatepicker>
  `,
})
export class FormlyFieldDateTime extends FieldType {
    get config() {
        return this.to.config;
    }
}
