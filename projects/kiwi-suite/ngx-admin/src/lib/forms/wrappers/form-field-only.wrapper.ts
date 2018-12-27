import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-only',
  template: `
    <div [class.has-error]="showError">
      <div class="kiwi-form-control-container">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>
  `,
})
export class FormlyWrapperFormFieldOnlyComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
