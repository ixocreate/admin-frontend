import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-repeat',
    template: `
        <!--<div ngxDroppable (drop)="onDrop($event)">-->
        <div (drop)="onDrop($event)">
            <!--<div *ngFor="let field of field.fieldGroup; let i = index;" ngxDraggable>-->
            <div *ngFor="let field of field.fieldGroup; let i = index;">
                <div class="d-flex justify-content-between align-items-start">
                    <formly-group class="flex-grow-1" 
                                  [model]="model[i]" 
                                  [field]="field" 
                                  [options]="options"
                                  [form]="formControl">
                    </formly-group>
                    <button class="btn btn-link text-danger" type="button" (click)="remove(i)">
                        <i class="fa fa-times"></i>
                    </button>
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
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }

    onDrop(event) {
    }
}
