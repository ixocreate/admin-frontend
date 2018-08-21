import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppDataService } from '../../services/data/app-data.service';

export class SelectOption {
  label: string;
  value?: any;
  group?: SelectOption[];
}

/**
 * see https://github.com/ng-select/ng-select
 *
 * TODO: add more ng-select options
 */

@Component({
  selector: 'formly-field-select',
  template: `
    <ng-container *ngIf="selectOptions">
      <ng-select
        [class.is-invalid]="showError"
        [items]="selectOptions"
        [bindValue]="valueProp"
        [bindLabel]="labelProp"
        [clearable]="clearable"
        [multiple]="multiple"
        [formControl]="formControl">
      </ng-select>
    </ng-container>
  `,
})
export class FormlyFieldSelectComponent extends FieldType implements OnInit, OnDestroy {

  selectOptions: any;

  public constructor(private appData: AppDataService) {
    super();
  }

  ngOnInit() {
    if (this.to.resource) {
      this.appData.getResourceSelect(this.to.resource.resource).then((options) => {
        this.selectOptions = options;
      });
    } else {
      const options: SelectOption[] = [];
      const groups: { [key: string]: SelectOption[] } = {};
      if (Array.isArray(this.to.options)) {
        this.to.options.map((option: SelectOption) => {
          if (!option[this.groupProp]) {
            options.push(option);
          } else {
            if (groups[option[this.groupProp]]) {
              groups[option[this.groupProp]].push(option);
            } else {
              groups[option[this.groupProp]] = [option];
              options.push({
                label: option[this.groupProp],
                group: groups[option[this.groupProp]],
              });
            }
          }
        });
      }
      this.selectOptions = options;
    }
  }

  get labelProp(): string {
    const defaultLabel = this.to.labelProp || 'label';
    return (this.to.resource) ? this.to.resource.label : defaultLabel;
  }

  get valueProp(): string {
    const defaultValue = this.to.valueProp || 'value';
    return (this.to.resource) ? this.to.resource.value : defaultValue;
  }

  get groupProp(): string {
    return this.to.groupProp || 'group';
  }

  get clearable() {
    return this.to.clearable;
  }

  get multiple() {
    return this.to.multiple || false;
  }
}
