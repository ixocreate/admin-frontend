import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppDataService } from '../../services/data/app-data.service';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { NgSelectComponent } from '@ng-select/ng-select';

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
      <div class="input-group">
        <ng-select
          #select
          (open)="onOpen()"
          (search)="onOpen()"
          [class.is-invalid]="showError"
          [items]="selectOptions"
          [placeholder]="to.placeholder"
          [searchable]="!to.extendedSelect"
          [bindValue]="valueProp"
          [bindLabel]="labelProp"
          [clearable]="false"
          [multiple]="multiple"
          [formControl]="formControl">
        </ng-select>
        <div class="input-group-append" *ngIf="clearable">
          <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export class FormlyFieldSelectComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  @ViewChild('select') select;

  selectOptions: any;


  public constructor(private appData: AppDataService) {
    super();
  }

  ngOnInit() {
    if (this.to.resource) {
      console.log(this.to);
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

  onOpen() {
    if (this.to.extendedSelect) {
      this.select.close();
      console.log('show extended select');
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
    return this.to.clearable && !this.to.disabled;
  }

  get multiple() {
    return this.to.multiple || false;
  }
}
