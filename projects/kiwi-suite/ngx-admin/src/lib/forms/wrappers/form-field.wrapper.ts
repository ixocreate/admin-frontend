import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field',
  template: `
    <div class="form-group" [class.has-error]="showError">
      <label *ngIf="to.label && to['hideLabel'] !== true" [attr.for]="id" class="kiwi-form-label">
        {{ to.label }}<ng-container *ngIf="to.required && to['hideRequiredMarker'] !== true"><b class="text-danger">*</b></ng-container>
      </label>

      <div class="kiwi-form-control-container">
        <ng-template #fieldComponent></ng-template>

        <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
          <formly-validation-message [field]="field"></formly-validation-message>
        </div>

        <small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>
      </div>
    </div>
  `,
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
