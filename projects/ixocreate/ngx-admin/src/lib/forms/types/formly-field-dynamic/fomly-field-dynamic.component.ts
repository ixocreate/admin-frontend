import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { clone, isNullOrUndefined } from '../../utils';
import { FormlyFieldRepeatableComponent } from '../formly-field-repeatable/formly-field-repeatable.component';
import { FormlyFormBuilder, FormlyTemplateOptions } from '@ngx-formly/core';
import { BlockCopy, CopyService } from '../../../services/copy.service';

export interface BlockSelect {
  label: string;
  value: any;
  copy?: BlockCopy;
}

@Component({
  selector: 'formly-field-dynamic',
  templateUrl: './fomly-field-dynamic.component.html'
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
    let titleConfig = fieldGroup.templateOptions.nameExpression;
    for (const key of Object.keys(model)) {
      titleConfig = titleConfig.replace(`%${key}%`, model[key] || '');
    }
    titleConfig = titleConfig.replace(/%.*%/g, '');
    return titleConfig;
  }

  footerVisible(fieldGroups, field, model) {
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
    const isNew = (!i && !initialModel);
    i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;

    if (isNew && this.selectedFieldGroupType && this.selectedFieldGroupType.copy) {
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
     * if there is no type definition remove control
     * might be from a stored element which was removed since then
     */
    if (!typeDefinition) {
      this.removeControls.push(i);
    }

    if (typeDefinition && templateOptions) {
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
