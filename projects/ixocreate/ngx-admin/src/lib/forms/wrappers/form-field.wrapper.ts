import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field',
  template: `
      <div class="form-group" [class.d-none]="to.type === 'hidden'" [class.center-label]="to['centerLabel']" [class.has-error]="showError">
          <label *ngIf="to.label && to['hideLabel'] !== true" [attr.for]="id" class="ixo-form-label">
              {{ to.label }}
              <ng-container *ngIf="to.required && to['hideRequiredMarker'] !== true"><b class="text-danger">*</b></ng-container>
          </label>

          <div class="ixo-form-control-container">
              <!--{{ to | json }}-->
              <div class="input-group">
                  <div class="input-group-prepend" *ngIf="prependIcon || prependText">
                      <span class="input-group-text">
                        <i *ngIf="prependIcon" class="fa fa-fw" [ngClass]="prependIconClass"></i>
                        <div *ngIf="prependText" style="min-width: 1.28571429em">
                          <small><b>{{ prependText }}</b></small>
                        </div>
                      </span>
                  </div>
                  <div style="flex-grow: 1">
                      <ng-template #fieldComponent></ng-template>
                  </div>
              </div>

              <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
                  <formly-validation-message [field]="field"></formly-validation-message>
              </div>

              <small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>
          </div>
      </div>
  `,
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  get prependIconClass() {
    const classes = {};
    classes[this.prependIcon] = true;
    return classes;
  }

  get prependIcon() {
    return this.metadata('prependIcon');
  }

  get prependText() {
    return this.metadata('prependText');
  }

  metadata(key) {
    return this.to['metadata'] && this.to['metadata'][key];
  }
}
