import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { clone, isNullOrUndefined } from '../utils';
import { FormlyFieldRepeatableComponent } from './repeatable';
import { FormlyTemplateOptions } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-dynamic',
  template: `
    <div class="form-dynamic-container">
      <div class="form-dynamic-toggles">
        <a href="#" (click)="toggleAll(false)">Collapse all</a> |
        <a href="#" (click)="toggleAll(true)">Expand all</a>
      </div>
      <div ngxDroppable [model]="field.fieldGroup" (drop)="onDrop($event)">
        <div class="form-dynamic" *ngFor="let fieldGroup of field.fieldGroup; let i = index;" ngxDraggable [model]="fieldGroup"
             [class.collapsed]="fieldGroup.templateOptions['collapsed']">
          <div class="form-dynamic-header">
            <button class="btn-move" type="button" ngxDragHandle title="Move">
              <i class="fa fa-fw fa-bars"></i>
            </button>
            <button class="btn-toggle" type="button" title="Close/Open" (click)="toggleContent(fieldGroup.templateOptions)">
              <i class="fa fa-fw fa-chevron-up"></i>
            </button>
            <div class="form-dynamic-title">
              {{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup['_type'] }}
            </div>
            <button class="btn btn-remove btn-sm" type="button" (click)="remove(i)" title="Remove">
              <i class="fa fa-fw fa-times"></i>
            </button>
          </div>
          <div class="form-dynamic-content" [class.d-none]="fieldGroup.templateOptions['collapsed']">
            <ng-container *ngIf="fieldGroup.fieldGroup.length > 1; else noChildren">
              <formly-group [model]="model[i]" [field]="fieldGroup" [options]="options" [form]="formControl"></formly-group>
            </ng-container>
            <ng-template #noChildren>
              <i>No options for this block.</i>
            </ng-template>
          </div>
        </div>
      </div>
      <div class="form-dynamic-footer" *ngIf="fieldGroups && fieldGroups.length > 0">
        <div class="input-group">
          <ng-select [items]="fieldGroupTypes" bindValue="value" [(ngModel)]="selectedFieldGroupType" [clearable]="false"></ng-select>
          <div class="input-group-append">
            <button class="btn btn-success" type="button" (click)="add()">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FormlyFieldDynamicComponent extends FormlyFieldRepeatableComponent implements OnInit {

  selectedFieldGroupType: string;
  fieldGroupTypes: string;

  removeControls = [];

  ngOnInit() {
    /**
     * preselect first fieldGroup type
     */
    this.selectedFieldGroupType = this.fieldGroups[0]._type;

    /**
     * TODO: add default block(s) by form definition if none yet
     */

    /**
     * disregard everything formly did until now as it does not understand our dynamic, repeatable formGroups
     */
    this.field.fieldGroup = [];

    const modelClone = clone(this.model);

    for (let i = modelClone.length - 1; i >= 0; i--) {
      this.remove(i);
    }

    /**
     * and refill it by our own model
     */
    modelClone.map((model, index) => {
      this.add(index, model);
    });

    /**
     * cleanup - remove controls that are marked for removal
     */
    this.removeControls.forEach(index => this.remove(index));

    this.fieldGroupTypes = this.fieldGroups.map((type) => {
      return {
        label: (type.templateOptions && type.templateOptions.label) || type._type,
        value: type._type,
      };
    });
  }

  get fieldGroups() {
    return this.field['fieldGroups'];
  }

  selectFieldGroup($event) {
    this.selectedFieldGroupType = $event.target.value;
  }

  toggleAll(visible: boolean) {
    for (const group of this.field.fieldGroup) {
      group.templateOptions.collapsed = !visible;
    }
    return false;
  }

  toggleContent(value, visible: boolean = null) {
    if (visible === null) {
      value.collapsed = !value.collapsed;
    } else {
      value.collapsed = !visible;
    }
  }

  add(i?: number, initialModel ?: any, templateOptions?: FormlyTemplateOptions) {
    i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;

    let model = clone(initialModel);
    if (!model) {
      model = {
        _type: this.selectedFieldGroupType,
      };
      // this.model.splice(i, 0, {...model});
    }
    this.model.splice(i, 0, model);

    let typeDefinition = null;
    this.fieldGroups.map(fieldGroup => {
      if (fieldGroup._type === model._type) {
        typeDefinition = fieldGroup;
      }
    });

    /**
     * if there is no type defintion remove control
     * might be from a stored element which was removed since then
     */
    if (!typeDefinition) {
      this.removeControls.push(i);
    }

    if (templateOptions) {
      typeDefinition.templateOptions = templateOptions;
    }

    const typeCopy = typeDefinition ? JSON.parse(JSON.stringify(typeDefinition)) : {fieldGroup: []};

    typeCopy.fieldGroup.unshift({
      key: '_type',
      type: 'input',
      templateOptions: {
        type: 'hidden',
        readonly: true,
      },
    });

    this.field.fieldGroup.splice(i, 0, {...Object.assign({}, typeCopy)});

    this.field.fieldGroup.forEach((field, index) => {
      field['key'] = `${index}`;
    });

    const form = new FormArray([]);
    this.formBuilder.buildForm(form, [this.field.fieldGroup[i]], this.model, this.options);
    this.formControl.insert(i, form.at(0));

    (<any> this.options).resetTrackModelChanges();
  }
}
