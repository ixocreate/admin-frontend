import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormlyWrapperTabComponent } from './tab.wrapper';

@Component({
  selector: 'formly-wrapper-tabset',
  template: `
      <ul class="nav nav-tabs">
          <li class="nav-item" *ngFor="let tab of tabs;let index = index;">
              <a class="nav-link" [class.active]="isActive(index)" [class.is-invalid]="showSubError(index)" (click)="activate(index)" href="#">
                  <i *ngIf="tab.to.icon" [class]="'mr-2 ' + tab.to.icon"></i>
                  {{ tab.to.label }}
              </a>
          </li>
      </ul>
      <ng-template #fieldComponent></ng-template>
  `,
})
export class FormlyWrapperTabsetComponent extends FieldWrapper implements OnInit {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  private _active = 0;
  private _tabs = [];

  get tabs() {
    return this._tabs;
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

  ngOnInit() {
    setTimeout(() => {
      this.activate(0);
    });
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

  showSubError(index) {
    return this._tabs[index].showSubError();
  }

  addTab(tab: FormlyWrapperTabComponent) {
    this._tabs.push(tab);
  }
}
