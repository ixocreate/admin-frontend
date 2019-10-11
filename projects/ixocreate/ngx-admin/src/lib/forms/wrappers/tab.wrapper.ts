import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabsetComponent } from './tabset.wrapper';

@Component({
  selector: 'formly-wrapper-tab',
  template: `
      <div class="tabset-content" [class.is-invalid]="showSubError()" [class.d-none]="!show">
          <ng-template #fieldComponent></ng-template>
      </div>
  `,
})
export class FormlyWrapperTabComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  show = false;

  constructor(tabset: FormlyWrapperTabsetComponent) {
    super();
    tabset.addTab(this);
  }

  showSubError(): boolean {
    for (const element of this.field['elements']) {
      if (this.form.controls[element.name] && this.form.controls[element.name].invalid && this.form.controls[element.name].touched) {
        return true;
      }
    }
    return false;
  }
}
