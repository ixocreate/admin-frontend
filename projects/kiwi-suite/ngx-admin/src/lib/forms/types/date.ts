import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-date',
  template: `
      <date-selector [formControl]="field.formControl" [dateLabel]="label"></date-selector>
  `,
})
export class FormlyFieldDate extends FieldType {
    get label() {
        return (this.to.label) ? this.to.label : "";
    }

    get placement() {
        return (this.to.placement) ? this.to.placement : "bottom";
    }
}
