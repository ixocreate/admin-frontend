import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';

import {AsyncSubject, of} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {SchemaFormArray, SchemaFormBuilder} from '../../forms/schema-form-builder';
import {ResourceModelControl, ResourceModelSchema} from '../../models';
import {AppInjector} from '../../services';
import {ResourceDetailComponent} from './resource-detail.component';

@Component({
    selector: 'resource-edit',
    templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ResourceDetailComponent implements OnInit, OnDestroy {

    private _formReady$ = new AsyncSubject();
    private _schemas: ResourceModelSchema[];

    protected action: string;
    protected formBuilder: SchemaFormBuilder;

    protected _model: any;
    model: any;
    form: FormGroup;
    fields: FormlyFieldConfig[];

    constructor(protected route: ActivatedRoute) {
        super(route);
        this.formBuilder = AppInjector.get(SchemaFormBuilder);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._formReady$ = null;
        this._model = null;
        this._schemas = null;
        this.form = null;
        this.model = null;
        this.fields = null;
    }

    get action$() {
        return this.route.data.pipe(map((data: { action: string }) => data.action));
    }

    get dirty$() {
        return of(true);
        // return Observable.from(Object.values(this.form.controls))
        //     .filter(control => control.dirty)
        //     .subscribe(control => {
        //         console.log(control);
        //         // Here doing stuff with all your dirty control
        //     });
    }

    get formReady$() {
        return this._formReady$.asObservable().pipe(takeUntil(this.destroyed$));
    }

    protected initModel() {
        if (this.action === 'create') {
            this._model = {};
            this.resetForm();
        }
        if (this.action === 'edit') {
            this.route.params.pipe(takeUntil(this.destroyed$))
                .subscribe(params => {
                    this.dataService.find(params['id'])
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(model => {
                            if (!model) {
                                return;
                            }
                            this._model = model;
                            this.resetForm();
                        });
                });
        }
    }

    protected resetModel() {
        this.model = Object.assign({}, this._model);
    }

    protected initForm() {
        this.form = new FormGroup({});
        this.dataService.schema$.pipe(takeUntil(this.destroyed$))
            .subscribe(schema => this.fields = schema.form);

        // this.fields = [{
        //     key: 'name',
        //     type: 'input',
        //     templateOptions: {
        //         type: 'text',
        //         label: 'Name',
        //         placeholder: 'Name',
        //         required: true,
        //     }
        // }];

        // this.buildFormFromSchemas(ModelSchemas.all, this.dataService.resourceKey);
    }

    protected resetForm() {
        this.resetModel();
        this.initForm();
        this._formReady$.next(true);
        this._formReady$.complete();
    }

    onSubmit(action = null): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the ' + this.resourceKey + '. Are all required fields entered?', 'Error');
            return;
        }

        switch (action) {
            case 'create':
                this.dataService.create(this.model, this.form.getRawValue())
                    .subscribe(result => {
                        this.toastr.success('The ' + this.resourceKey + ' was successfully created', 'Success');
                        // TODO: swapping directly to edit view is only possible if we know the model result consistently
                        // this.action = 'edit';
                        // this.initModel();
                        this.dataService.load();
                        this.router.navigate([this.pathPrefix + this.dataService.resourceKey]);
                    }, () => {
                        this.toastr.error('There was an error in creating the ' + this.resourceKey, 'Error');
                    });
                break;
            case 'edit':
                this.dataService.update(this.model, this.form.getRawValue())
                    .subscribe(
                        (result) => {
                            this.toastr.success('The ' + this.resourceKey + ' was successfully updated', 'Success');
                            /**
                             * loading the dataservice here causes the form to reinitialise
                             * which results in unexpected results (duplicating items in the form raw model)
                             */
                            // this.dataService.load(this.model.id);
                        }, () => {
                            this.toastr.error('An error occurred while saving the ' + this.resourceKey, 'Error');
                        }
                    );
                break;
        }
    }

    /**
     * @deprecated use formly forms
     */
    getDirtyState(form: FormGroup): Object {
        return Object.keys(form.controls).reduce<Object>((dirtyState, controlKey) => {
            const control = form.controls[controlKey];

            if (!control.dirty) {
                return dirtyState;
            }

            if (control instanceof FormGroup) {
                return {
                    ...dirtyState,
                    [controlKey]: this.getDirtyState(control),
                };
            }

            return {
                ...dirtyState,
                [controlKey]: control.value,
            };
        }, {});
    }

    /**
     * @deprecated use formly forms
     */
    protected buildFormFromSchemas(schemas: ResourceModelSchema[], schemaName: string) {
        this._schemas = schemas;
        const schema = this._schemas.find(_schema => _schema.name === schemaName);
        this.form = this.formBuilder.group(this.buildControls(schema, this.model), schema);
    }

    /**
     * @deprecated use formly forms
     */
    buildControls(schema: ResourceModelSchema, data: any) {
        const controls = {};
        schema.controls.forEach(control => {
            const entryData = data[control.name] || null;
            if (control.repeatable) {
                const formArray = this.formBuilder.array([], control);
                if (entryData && Object.prototype.toString.call(entryData) === '[object Array]') {
                    entryData.forEach(_data => formArray.push(this.buildControl(control, _data)));
                } else {
                    /**
                     * TODO: check if an initial entry should be created
                     */
                    // formArray.push(this.buildControl(control.name, schema[0], null));
                }
                controls[control.name] = formArray;
            } else {
                controls[control.name] = this.buildControl(control, entryData);
            }
        });
        return controls;
    }

    /**
     * @deprecated use formly forms
     */
    buildControl(control: ResourceModelControl, data: any) {
        let schema = control.schema;
        if (typeof schema === 'string') {
            schema = this._schemas.find(_schema => _schema.name === schema);
        }
        if (schema && data) {
            return this.formBuilder.group(this.buildControls(<ResourceModelSchema>schema, data), control);
        }
        return this.formBuilder.control(data, control);
    }

    /**
     * @deprecated use formly forms
     */
    addControl(control: SchemaFormArray, data: any) {
        console.log('schema', control.controlSchema);
        control.push(this.buildControl(control.controlSchema, data));
    }

    /**
     * @deprecated use formly forms
     */
    removeControl(control: FormArray, index) {
        control.removeAt(index);
    }
}
