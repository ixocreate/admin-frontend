import {Component, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-dynamic',
    template: `
        <div>
            {{ field.templateOptions.label }}
            <div class="card mb-3" *ngFor="let field of field.fieldGroup; let i = index;">
                <div class="card-header p-0">
                    <span class="d-inline-block card-title mt-2 mb-0 ml-3">
                        {{ field.fieldGroupType }}
                    </span>
                    <button class="btn btn-link text-danger float-right" type="button" (click)="remove(i)"
                            title="Remove">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="card-body">
                    <formly-group [model]="model[i]"
                                  [field]="field"
                                  [options]="options"
                                  [form]="formControl">
                    </formly-group>
                </div>
            </div>
        </div>
        <!--<select name="" id="">-->
        <!--<option *ngFor="let blockType of blockTypes" value=""></option>-->
        <!--</select>-->
        <button class="btn btn-link" type="button" (click)="addFieldGroupByKey(0)">
            <i class="fa fa-plus"></i>
            {{ field.templateOptions.btnText }}
        </button>
    `,
})
export class FormlyFieldDynamic extends FieldArrayType implements OnInit {

    private formBuilder: FormlyFormBuilder;

    constructor(builder: FormlyFormBuilder) {
        super(builder);
        this.formBuilder = builder;
    }

    ngOnInit() {
        /**
         * TODO: add default block(s) by form definition if none yet
         */
        setTimeout(() => {
            this.addFieldGroupByKey(0,
                {
                    'name': 'Test',
                    'images': [{
                        'image': {
                            'id': '9104464a-c115-4fa5-b991-45a28ef3d9e2',
                            'basePath': 'f6/04/e6/',
                            'filename': 'test-too-large.jpg',
                            'mimeType': 'image/jpeg',
                            'size': 442207,
                            'createdAt': '2018-05-14T18:12:40+00:00'
                        }
                    }, {
                        'image': {
                            'id': 'ad3bc6c9-2d61-4395-93a3-58db4098a21c',
                            'basePath': 'd0/61/22/',
                            'filename': 'icon.png',
                            'mimeType': 'image/png',
                            'size': 8531,
                            'createdAt': '2018-05-16T20:18:24+00:00'
                        }
                    }, {
                        'image': {
                            'id': '9104464a-c115-4fa5-b991-45a28ef3d9e2',
                            'basePath': 'f6/04/e6/',
                            'filename': 'test-too-large.jpg',
                            'mimeType': 'image/jpeg',
                            'size': 442207,
                            'createdAt': '2018-05-14T18:12:40+00:00'
                        }
                    }]
                });
        }, 200)
    }

    addFieldGroupByKey(key?: number, initialModel?: any) {
        const i = this.field.fieldGroup.length;
        this.model.splice(i, 0, initialModel ? {...initialModel} : undefined);

        const typeDefinition = this.field['availableFieldGroups'][key];

        // TODO: check if type was found
        if (!typeDefinition) {
            return;
        }

        const typeCopy = JSON.parse(JSON.stringify(typeDefinition));
        this.field.fieldGroup.splice(i, 0, {...Object.assign({}, typeCopy)});

        this.field.fieldGroup.forEach((field, index) => {
            field.key = `${index}`;
            field['fieldGroupType'] = typeDefinition.key;
        });

        const form = new FormArray([]);
        this.formBuilder.buildForm(form, [this.field.fieldGroup[i]], this.model, this.options);
        this.formControl.push(form.at(0));

        (<any> this.options).resetTrackModelChanges();
    }

    clone(value: any): any {
        value = Object.assign({}, value);
        Object.keys(value).forEach(k => value[k] = this.clone(value[k]));
        return value;
    }

    onDrop(event) {
        console.log(event);
    }

    getSchema(_type: string) {
        console.log(_type);
    }
}
