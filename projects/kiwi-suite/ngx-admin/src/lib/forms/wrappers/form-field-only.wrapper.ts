import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-only',
  template: `
    <div class="form-group" [class.center-label]="to['centerLabel']" [class.has-error]="showError">
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
export class FormlyWrapperFormFieldOnlyComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
