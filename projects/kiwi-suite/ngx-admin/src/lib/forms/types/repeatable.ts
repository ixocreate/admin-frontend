import {Component} from '@angular/core';
import {FormArray} from '@angular/forms';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-repeat',
    template: `
        <div ngxDroppable [model]="field.fieldGroup" (drop)="onDrop($event)">
            <!--<div (drop)="onDrop($event)">-->
            <div class="card mb-3"
                 *ngFor="let field of field.fieldGroup; let i = index;"
                 ngxDraggable
                 [model]="field">
                <!--<div *ngFor="let field of field.fieldGroup; let i = index;">-->
                <!--<div class="d-flex justify-content-between align-items-start">-->
                <div class="card-header p-0">
                    <button class="btn btn-link text-danger float-right" type="button" (click)="remove(i)"
                            title="Remove">
                        <i class="fa fa-times"></i>
                    </button>
                    <button class="btn btn-link text-muted" type="button"
                            ngxDragHandle
                            title="Remove">
                        <i class="fa fa-bars"></i>
                    </button>
                    <span class="card-title">
                        {{ (fieldGroup.templateOptions && fieldGroup.templateOptions.label) || fieldGroup.type }}
                    </span>
                </div>
                <div class="card-body p-3">
                    <formly-group class="flex-grow-1"
                                  [model]="model[i]"
                                  [field]="field"
                                  [options]="options"
                                  [form]="formControl">
                    </formly-group>
                </div>
            </div>
        </div>
        <button class="btn btn-link" type="button" (click)="add()">
            <i class="fa fa-plus"></i>
            {{ field.templateOptions.btnText }}
        </button>
    `,
})
export class FormlyFieldRepeatable extends FieldArrayType {

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

        /**
         * ... then change the key on the model ...
         */
        this.field.fieldGroup.forEach((field, index) => {
            field['key'] = `${index}`;
        });

        /**
         * ... and apply new model
         */
        this.model = sortedModels;

        /**
         * rebuild the whole form...
         */
        const form = new FormArray([]);
        this.formBuilder.buildForm(form, this.field.fieldGroup, this.model, this.options);

        /**
         * ... and re-apply each control to the current control
         */
        form.controls.forEach((item, index) => {
            this.formControl.setControl(index, item);
        });

        /**
         * now, go to sleep happily and hope to never have to touch this again
         */
    }
}
