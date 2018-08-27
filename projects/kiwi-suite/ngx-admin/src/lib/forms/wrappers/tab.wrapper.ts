import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabsetComponent } from './tabset.wrapper';

@Component({
  selector: 'formly-wrapper-tab',
  template: `
    <div [class.d-none]="!show">
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
}
