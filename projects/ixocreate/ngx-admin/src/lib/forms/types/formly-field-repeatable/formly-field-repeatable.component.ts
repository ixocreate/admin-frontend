import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder, FormlyTemplateOptions } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-repeat',
  templateUrl: './formly-field-repeatable.component.html'
})
export class FormlyFieldRepeatableComponent extends FieldArrayType {

  protected formBuilder: FormlyFormBuilder;

  constructor(builder: FormlyFormBuilder) {
    super(builder);
    this.formBuilder = builder;
  }

  onDrop(event) {
    /**
     * first, reorder the model and keep the reference (no clone/spread) ...
     */
    const sortedData = [];
    this.field.fieldGroup.forEach((field, index) => {
      /**
       * index has already changed here, but key has not
       */
      const currentModel = this.model[field['key']];
      sortedData.push({
        model: currentModel,
        templateOptions: field.templateOptions,
      });
    });

    for (let i = sortedData.length - 1; i >= 0; i--) {
      this.remove(i);
    }

    sortedData.forEach((data, index) => {
      this.add(index, data.model, data.templateOptions);
    });

    (this.options as any).resetTrackModelChanges();
  }

  add(i?: number, initialModel?: any, templateOptions?: FormlyTemplateOptions) {
    super.add(i, initialModel);
  }
}
