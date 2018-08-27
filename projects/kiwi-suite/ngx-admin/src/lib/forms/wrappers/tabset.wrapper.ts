import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabComponent } from './tab.wrapper';

@Component({
  selector: 'formly-wrapper-tabset',
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item" *ngFor="let tab of groups;let index = index;">
        <a class="nav-link" [class.active]="isActive(index)" (click)="activate(index)" href="#">
          {{ tab.templateOptions.label }}
        </a>
      </li>
    </ul>
    <div class="tabset-content">
      <ng-template #fieldComponent></ng-template>
    </div>
  `,
})
export class FormlyWrapperTabsetComponent extends FieldWrapper implements OnInit {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  private _active = 0;
  private _tabs = [];

  ngOnInit() {
    setTimeout(() => {
      this.activate(0);
    });
  }

  get groups() {
    if (!this.field) {
      return [];
    }

    if (!this.field.fieldGroup) {
      return [];
    }
    return this.field.fieldGroup;
  }

  isActive(index): boolean {
    return (index === this._active);
  }

  activate(index) {
    this._active = index;

    this._tabs.forEach((value, key) => {
      value.show = (this._active === key);
    });

    return false;
  }

  addTab(tab: FormlyWrapperTabComponent) {
    this._tabs.push(tab);
  }
}
