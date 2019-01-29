export class FormHelper {

  static setTemplateOption(fields: any[], key: string, value: any): any[] {
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

}
