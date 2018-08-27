import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-repeat',
  template: `
    <div ngxDroppable [model]="field.fieldGroup" (drop)="onDrop($event)">
      <div class="card mb-3" *ngFor="let fieldGroup of field.fieldGroup; let i = index;" ngxDraggable [model]="fieldGroup">
        <div class="card-header p-0">
          <button class="btn btn-link text-danger float-right" type="button" (click)="remove(i)" title="Remove">
            <i class="fa fa-times"></i>
          </button>
          <button class="btn btn-link text-muted" type="button" ngxDragHandle title="Remove">
            <i class="fa fa-bars"></i>
          </button>
          <span class="card-title">
            {{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup.type }}
          </span>
        </div>
        <div class="card-body p-3">
          <formly-group class="flex-grow-1" [model]="model[i]" [field]="fieldGroup" [options]="options" [form]="formControl">
          </formly-group>
        </div>
      </div>
    </div>
    <button class="btn btn-link" type="button" (click)="add()">
      <i class="fa fa-plus"></i>
    </button>
  `,
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
    const sortedModels = [];
    this.field.fieldGroup.forEach((field, index) => {
      /**
       * index has already changed here, but key has not
       */
      const currentModel = this.model[field['key']];
      sortedModels.push(currentModel);
    });

    for (let i = sortedModels.length - 1; i >= 0; i--) {
      this.remove(i);
    }

    sortedModels.forEach((model, index) => {
      this.add(index, model);
    });

    (<any> this.options).resetTrackModelChanges();
  }
}
