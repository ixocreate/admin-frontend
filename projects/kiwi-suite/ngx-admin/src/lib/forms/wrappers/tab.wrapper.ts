import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabsetComponent } from './tabset.wrapper';

@Component({
  selector: 'formly-wrapper-tab',
  template: `
    <div class="tabset-content" [class.is-invalid]="hasError()" [class.d-none]="!show">
      <ng-template #fieldComponent></ng-template>
    </div>
  `,
})
export class FormlyWrapperTabComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  _show = false;

  constructor(tabset: FormlyWrapperTabsetComponent) {
    super();
    tabset.addTab(this);
  }

  set show(show: boolean) {
    this._show = show;
  }

  get show(): boolean {
    return this._show;
  }

  hasError(): boolean {
    let hasError = false;
    this.field['elements'].forEach((value) => {
      if (this.form.controls[value.name].invalid && this.form.controls[value.name].touched) {
        hasError = true;
      }
    });
    return hasError;
  }
}
