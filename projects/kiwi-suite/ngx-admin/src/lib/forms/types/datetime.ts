import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-datetime',
  template: `
      <input class="form-control"
             [formlyAttributes]="field"
             [formControl]="formControl"
             [placement]="placement"
             [bsConfig]="config"
             bsDatepicker>
  `,
})
export class FormlyFieldDateTime extends FieldType {
    get config() {
        return this.to.config;
    }

    get placement() {
        return (this.to.placement) ? this.to.placement : "bottom";
    }
}
