import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-section',
  template: `
    <h6 *ngIf="to.label"><i class="{{ to['icon'] }}" *ngIf="to['icon']"></i> {{ to.label }}</h6>
    <ng-template #fieldComponent></ng-template>
    <hr *ngIf="!to['divider'] || to['divider'] !== false">
  `,
})
export class FormlyWrapperSectionComponent extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
