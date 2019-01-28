import {FormlyFieldConfig} from '@ngx-formly/core';

export class FormHelper {

  static setTemplateOption(fields: FormlyFieldConfig[], key: string, value: any): FormlyFieldConfig[] {
    fields = [...fields];
    for (const field of fields) {
      if (field.fieldGroup) {
        field.fieldGroup = FormHelper.setTemplateOption(field.fieldGroup, key, value);
      } else {
        field.templateOptions[key] = value;
      }
    }
    return fields;
  }

  static buildSchemaTree(fieldGroup, branch) {
    fieldGroup.forEach(field => {
      const fieldKey = field.key || (field.templateOptions ? field.templateOptions.name : null);
      if (fieldKey) {
        branch[fieldKey] = {};
        branch[fieldKey].formlyFields = field;
        if (field.fieldGroup) {
          this.buildSchemaTree(field.fieldGroup, branch[fieldKey]);
        }
      }
    });
    return branch;
  }

}
