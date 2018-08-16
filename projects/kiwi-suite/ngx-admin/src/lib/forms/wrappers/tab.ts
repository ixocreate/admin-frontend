import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabset } from './tabset';

@Component({
  selector: 'formly-wrapper-tab',
  template: `        
        <div [ngClass]="{'d-none': !show}">
            <ng-template #fieldComponent></ng-template>
        </div>
    `,
})
export class FormlyWrapperTab extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef})
  fieldComponent: ViewContainerRef;

  _show: boolean = false;

  constructor(tabset: FormlyWrapperTabset) {
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
