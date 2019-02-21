import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { clone, isNullOrUndefined } from '../utils';
import { FormlyFieldRepeatableComponent } from './repeatable';
import { FormlyFormBuilder, FormlyTemplateOptions } from '@ngx-formly/core';
import { BlockCopy, CopyService } from '../../services/copy.service';

export interface BlockSelect {
  label: string;
  value: any;
  copy?: BlockCopy;
}

@Component({
  selector: 'formly-field-dynamic',
  template: `
    <div class="form-dynamic-container" [class.no-childs]="field.fieldGroup.length === 0">
      <div class="form-dynamic-label" *ngIf="field.templateOptions.label">
        {{ field.templateOptions.label }}
      </div>
      <div class="form-dynamic-toggles" [class.d-none]="field.fieldGroup.length === 0">
        <a href="#" (click)="toggleAll(false)">Collapse all</a> |
        <a href="#" (click)="toggleAll(true)">Expand all</a>
      </div>
      <div ngxDroppable [model]="field.fieldGroup" (drop)="onDrop($event)">
        <ng-container *ngFor="let fieldGroup of field.fieldGroup; let i = index;">
          <div class="form-dynamic" ngxDraggable [model]="fieldGroup"
               [class.is-invalid]="showSubError(fieldGroup)"
               [class.collapsed]="fieldGroup.templateOptions['collapsed']">
            <div class="form-dynamic-header">
              <button class="btn-move" type="button" ngxDragHandle title="Move">
                <i class="fa fa-fw fa-bars"></i>
              </button>
              <button class="btn-toggle" type="button" title="Close/Open" (click)="toggleContent(fieldGroup.templateOptions)">
                <i class="fa fa-fw fa-chevron-up"></i>
              </button>
              <div class="form-dynamic-title">
                <!-- <input [(ngModel)]="fieldGroup.model._meta.name" placeholder="Click to enter custom name..." class="form-dynamic-input"/> -->
                <div>{{ blockTitle(model[i], fieldGroup) }}</div>
                <div class="ml-auto">{{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup['_type'] }}</div>
              </div>
              <div class="btn-group" kiwiDropdown>
                <button class="btn-more dropdown-btn" type="button">
                  <i class="fa fa-fw fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <button *ngIf="fieldGroup.templateOptions['allowCopy']" class="dropdown-item" (click)="copyBlock(fieldGroup.model)" type="button">
                    <i class="fa fa-fw fa-clone"></i> Copy Block
                  </button>
                  <button class="dropdown-item dropdown-item-danger" (click)="remove(i)" type="button">
                    <i class="fa fa-fw fa-trash"></i> Delete Block
                  </button>
                </div>
              </div>
            </div>
            <div class="form-dynamic-content" [class.collapsed]="fieldGroup.templateOptions['collapsed']">
              <ng-container *ngIf="fieldGroup.fieldGroup.length > 1; else noChildren">
                <formly-group [model]="model[i]" [field]="fieldGroup" [options]="options" [form]="formControl"></formly-group>
              </ng-container>
              <ng-template #noChildren>
                <i>No options for this block.</i>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
      <div class="form-dynamic-footer" *ngIf="footerVisible(fieldGroups, field, model)">
        <ng-container *ngIf="fieldGroupTypes.length > 1; else singleField">
          <div class="input-group">
            <ng-select [items]="fieldGroupTypes" [(ngModel)]="selectedFieldGroupType" bindLabel="label" [clearable]="false">
              <ng-template ng-option-tmp let-item="item" let-index="index" let-search="searchTerm">
                <div class="d-flex" *ngIf="item.copy">
                  <div class="flex-grow-1">{{ item.label }}</div>
                  <button class="select-remove" (click)="removeCopiedBlock(item)">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
                <div *ngIf="!item.copy">{{ item.label }}</div>
              </ng-template>
            </ng-select>
            <div class="input-group-append">
              <button class="btn btn-success" type="button" (click)="add()">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </ng-container>
        <ng-template #singleField>
          <div class="text-right">
            <button class="btn btn-sm btn-success" type="button" (click)="add()" *ngIf="fieldGroupTypes[0]">
              <i class="fa fa-plus"></i> {{ fieldGroupTypes[0].label }}
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class FormlyFieldDynamicComponent extends FormlyFieldRepeatableComponent implements OnInit {

  selectedFieldGroupType: BlockSelect;
  fieldGroupTypes: BlockSelect[];

  removeControls = [];

  constructor(private copy: CopyService, builder: FormlyFormBuilder) {
    super(builder);
  }

  ngOnInit() {
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
    this.removeControls.forEach((index) => this.remove(index));

    this.setFieldGroupTypes();
  }

  get fieldGroups() {
    return this.field['fieldGroups'];
  }

  blockTitle(model, fieldGroup) {
    //let titleConfig = 'Name: %id%';
    let titleConfig = '';
    for (const key of Object.keys(model)) {
      titleConfig = titleConfig.replace(`%${key}%`, model[key]);
    }
    return titleConfig;
  }

  private footerVisible(fieldGroups, field, model) {
    return fieldGroups && fieldGroups.length > 0 &&
      (!field.templateOptions['limit'] || field.templateOptions['limit'] === null || (field.templateOptions['limit'] > model.length));
  }

  private setFieldGroupTypes() {
    const nameMap = {};
    this.fieldGroupTypes = this.fieldGroups.map((type) => {
      nameMap[type._type] = (type.templateOptions && type.templateOptions.label) || type._type;
      const data = {
        label: nameMap[type._type],
        value: type._type,
      };
      /**
       * preselect first fieldGroup type
       */
      if (!this.selectedFieldGroupType) {
        this.selectedFieldGroupType = data;
      }
      return data;
    });

    this.copy.copiedBlocks.forEach((copy) => {
      if (nameMap[copy.model._type]) {
        this.fieldGroupTypes.push({
          label: copy.name + ' - ' + nameMap[copy.model._type],
          value: copy.model,
          copy,
        });
      }
    });
  }

  showSubError(fieldGroup) {
    for (const element of Object.values(fieldGroup.formControl.controls) as any) {
      if (element.invalid && element.touched) {
        return true;
      }
    }
    return false;
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

  copyBlock(model: any) {
    this.copy.addCopiedBlock(model).then(() => {
      this.setFieldGroupTypes();
    });
  }

  remove(i) {
    super.remove(i);
  }

  removeCopiedBlock(copiedBlock: BlockSelect) {
    this.copy.removeCopiedBlock(copiedBlock.copy).then(() => {
      this.setFieldGroupTypes();
      setTimeout(() => {
        this.selectedFieldGroupType = this.fieldGroupTypes[0];
      });
    });
  }

  add(i?: number, initialModel ?: any, templateOptions?: FormlyTemplateOptions) {
    i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;

    if (this.selectedFieldGroupType && this.selectedFieldGroupType.copy) {
      initialModel = this.selectedFieldGroupType.copy.model;
    }

    let model = clone(initialModel);
    if (!model) {
      model = {
        _type: this.selectedFieldGroupType.value,
      };
    }
    if (!model._meta) {
      model._meta = {};
    }
    if (!model._meta._name) {
      model._meta._name = '';
    }
    this.model.splice(i, 0, model);

    let typeDefinition = null;
    this.fieldGroups.map((fieldGroup) => {
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

    (this.options as any).resetTrackModelChanges();
  }
}
