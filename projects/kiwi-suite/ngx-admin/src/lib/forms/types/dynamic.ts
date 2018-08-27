import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { clone, isNullOrUndefined } from '../utils';
import { FormlyFieldRepeatableComponent } from './repeatable';

@Component({
  selector: 'formly-field-dynamic',
  template: `
    <div ngxDroppable [model]="field.fieldGroup" (drop)="onDrop($event)">
      <div class="card mb-3"
           *ngFor="let fieldGroup of field.fieldGroup; let i = index;"
           ngxDraggable
           [model]="fieldGroup">
        <div class="card-header p-0">
          <button class="btn btn-link text-danger float-right" type="button" (click)="remove(i)"
                  title="Remove">
            <i class="fa fa-times"></i>
          </button>
          <button class="btn btn-link text-muted" type="button"
                  ngxDragHandle
                  title="Move">
            <i class="fa fa-bars"></i>
          </button>
          <span class="card-title">
                        {{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup['_type'] }}
                    </span>
        </div>
        <div class="card-body p-3">
          <formly-group [model]="model[i]"
                        [field]="fieldGroup"
                        [options]="options"
                        [form]="formControl">
          </formly-group>
          <!--{{ model[i] | json }}-->
        </div>
      </div>
    </div>
    <div class="form-group" *ngIf="fieldGroups && fieldGroups.length > 0">
      <div class="input-group">
        <select class="custom-select" (change)="selectFieldGroup($event)">
          <option *ngFor="let fieldGroup of fieldGroups" [value]="fieldGroup._type">
            {{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup._type }}
          </option>
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button"
                  (click)="add()">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class FormlyFieldDynamicComponent extends FormlyFieldRepeatableComponent implements OnInit {

  selectedFieldGroupType: string;
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

  }

  get fieldGroups() {
    return this.field['fieldGroups'];
  }

  selectFieldGroup($event) {
    this.selectedFieldGroupType = $event.target.value;
  }

  add(i?: number, initialModel ?: any) {
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
