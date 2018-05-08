import {Component} from '@angular/core';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'app-formly-repeat-section',
    template: `
        <div ngxDroppable (drop)="onDrop($event)">
            <div *ngFor="let field of field.fieldGroup; let i = index;" ngxDraggable>
                <formly-group [model]="model[i]" [field]="field" [options]="options" [form]="formControl">
                    <div class="d-flex align-items-center">
                        <button class="btn btn-danger" type="button" (click)="remove(i)">Remove</button>
                    </div>
                </formly-group>
            </div>
        </div>
        <button class="btn btn-link" type="button" (click)="add()">
            <i class="fa fa-plus"></i>
            {{ field.fieldArray.templateOptions.btnText }}
        </button>
    `,
})
export class RepeatTypeComponent extends FieldArrayType {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
        console.log(this.options);
    }
    
    onDrop(event) {
        console.log(event);
    }
}
