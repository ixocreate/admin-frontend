import {Component, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {FieldArrayType, FormlyFormBuilder} from '@ngx-formly/core';
import {LoggerService} from '../../services';

@Component({
    selector: 'formly-field-dynamic',
    template: `
        <div>
            <div class="card mb-3" *ngFor="let fieldGroup of field.fieldGroup; let i = index;">
                <div class="card-header p-0">
                    <span class="d-inline-block card-title mt-2 mb-0 ml-3">
                        {{ fieldGroup._type }}
                    </span>
                    <button class="btn btn-link text-danger float-right" type="button" (click)="remove(i)"
                            title="Remove">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="card-body">
                    <formly-group [model]="model[i]"
                                  [field]="fieldGroup"
                                  [options]="options"
                                  [form]="formControl">
                    </formly-group>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <select class="custom-select" (change)="selectFieldGroup($event)">
                    <option *ngFor="let fieldGroup of fieldGroups" [value]="fieldGroup._type">
                        {{ fieldGroup.label || fieldGroup._type }}
                    </option>
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-info" type="button"
                            (click)="add()">
                        <i class="fa fa-plus"></i>
                        {{ field.templateOptions.btnText }}
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class FormlyFieldDynamic extends FieldArrayType implements OnInit {

    private formBuilder: FormlyFormBuilder;
    selectedFieldGroupType: string;

    constructor(builder: FormlyFormBuilder,
                private logger: LoggerService) {
        super(builder);
        this.formBuilder = builder;
    }

    ngOnInit() {
        /**
         * preselect first fieldGroup type
         */
        this.selectedFieldGroupType = this.fieldGroups[0]._type;

        /**
         * TODO: add default block(s) by form definition if none yet
         */

        /**
         * field form by existing model
         */
        this.model = [
            {
                images: [
                    {
                        image: {
                            basePath: '54/80/04/',
                            createdAt: '2018-05-18T16:20:00+00:00',
                            filename: '04b5fd2aa211f9eb92e880444f944114-i-love-beards-beard-love.png',
                            id: 'e6acbbf3-f3e7-4552-ba66-abdab94eba5a',
                            mimeType: 'image/png',
                            size: 100208,
                        },
                        description: '<p><em>argaergaerg</em></p>',
                    },
                    {
                        image: {
                            basePath: '54/80/04/',
                            createdAt: '2018-05-18T16:20:00+00:00',
                            filename: '04b5fd2aa211f9eb92e880444f944114-i-love-beards-beard-love.png',
                            id: 'e6acbbf3-f3e7-4552-ba66-abdab94eba5a',
                            mimeType: 'image/png',
                            size: 100208,
                        },
                    },
                ],
                name: 'Test simple 1',
                _type: 'simple',
            },
            {
                images: [
                    {
                        image: {
                            basePath: '54/80/04/',
                            createdAt: '2018-05-18T16:20:00+00:00',
                            filename: '04b5fd2aa211f9eb92e880444f944114-i-love-beards-beard-love.png',
                            id: 'e6acbbf3-f3e7-4552-ba66-abdab94eba5a',
                            mimeType: 'image/png',
                            size: 100208,
                        },
                    },
                ],
                name: 'Test simple 2',
                _type: 'simple',
            },
            {
                image: 'test',
                name: 'test',
                _type: 'teaser',
            },
            {
                images: [{media: "Image 1"}, {media: "Image 2"}],
                _type: 'slideshow',
            },
        ];

        this.model.map(model => {
            this.add(model);
        });

        // :
        //     {_type: "", name: "test", image: "test"}
        //     image
        //         :
        //         "test"
        //     name
        //         :
        //         ""
        //     _type
        //         :
        //         "teaser"
        //     2
        // :
        //     {_type: "slideshow", images: [{media: "Image 1"}, {media: "Image 2"}]}
        //     images
        //         :
        //         [{media: "Image 1"}, {media: "Image 2"}]
        //     0
        // :
        //     {media: "Image 1"}
        //     media
        //         :
        //         "Image 1"
        //     1
        // :
        //     {media: "Image 2"}
        //     media
        //         :
        //         "Image 2"
        //     _type
        //         :
        //         "slideshow"
    }

    get fieldGroups() {
        return this.field['fieldGroups'];
    }

    selectFieldGroup($event) {
        this.selectedFieldGroupType = $event.target.value;
    }

    add(initialModel ?: any) {

        console.log(initialModel);

        const i = this.field.fieldGroup.length;

        let model = initialModel;
        if (!model) {
            model = {
                _type: this.selectedFieldGroupType,
            };
            this.model.splice(i, 0, {...model});
        }

        let typeDefinition = null;
        this.fieldGroups.map(fieldGroup => {
            if (fieldGroup._type == model._type) {
                typeDefinition = fieldGroup;
            }
        });

        if (!typeDefinition) {
            this.logger.logError('No valid FieldGroup selected');
            return;
        }

        const typeCopy = JSON.parse(JSON.stringify(typeDefinition));

        typeCopy.fieldGroup.unshift({
            key: '_type',
            type: 'input',
            templateOptions: {
                type: 'hidden',
                readonly: true,
            }
        });

        this.field.fieldGroup.splice(i, 0, {...Object.assign({}, typeCopy)});

        this.field.fieldGroup.forEach((field, index) => {
            field['key'] = `${index}`;
        });

        const form = new FormArray([]);
        this.formBuilder.buildForm(form, [this.field.fieldGroup[i]], this.model, this.options);
        this.formControl.push(form.at(0));

        console.log(this.model);

        (<any> this.options).resetTrackModelChanges();
    }

    clone(value
              :
              any
    ):
        any {
        value = Object.assign({}, value);
        Object.keys(value).forEach(k => value[k] = this.clone(value[k]));
        return value;
    }

    onDrop(event) {
        console.log(event);
    }

    getSchema(_type
                  :
                  string
    ) {
        console.log(_type);
    }
}
