
import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';

import {AsyncSubject, Subscription, of} from 'rxjs';
import {SchemaFormArray, SchemaFormBuilder} from '../../forms/schema-form-builder';
import {ResourceModelControl, ResourceModelSchema} from '../../models';
import {AppInjector} from '../../services/app-injector.service';
import {ResourceDetailComponent} from './resource-detail.component';

@Component({
    selector: 'app-resource-edit',
    templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ResourceDetailComponent implements OnInit, OnDestroy {

    private _formReady$ = new AsyncSubject();
    private _model: any;
    private _modelSub: Subscription;
    private _schemas: ResourceModelSchema[];
    private _routeParamsSub: Subscription;

    protected action: string;
    protected formBuilder: SchemaFormBuilder;

    form: FormGroup;
    model: any;
    fields: FormlyFieldConfig[];

    constructor(protected route: ActivatedRoute) {
        super(route);
        // this.formBuilder = AppInjector.get(FormBuilder);
        this.formBuilder = AppInjector.get(SchemaFormBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        // if (this._modelSub) {
        //     this._modelSub.unsubscribe();
        // }
        // if (this._routeParamsSub) {
        //     this._routeParamsSub.unsubscribe();
        // }
        super.ngOnDestroy();
        this.model = null;
        this.form = null;
        this._formReady$ = null;
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
            this._routeParamsSub = this.route.params.subscribe(params => {
                this._modelSub = this.dataService.find(params['id'])
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

    initForm() {
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

    resetForm() {
        this.resetModel();
        this.initForm();
        this._formReady$.next(true);
        this._formReady$.complete();
    }

    onSubmit(action) {
        switch (action) {
            case 'create':
                this.dataService.create(this.model, this.form.getRawValue())
                    .subscribe(result => {
                        this.toastr.success('The item was successfully created ', 'Success');
                        // TODO: swapping directly to edit view is only possible if we know the model result consistently
                        // this.action = 'edit';
                        // this.initModel();
                        this.dataService.load();
                        this.router.navigate([this.pathPrefix + this.dataService.resourceKey]);
                    }, () => {
                        this.toastr.error('There was an error in creating the item', 'Error', {
                            timeOut: 0,
                        });
                    });
                break;
            case 'edit':
                this.dataService.update(this.model, this.form.getRawValue())
                    .subscribe(
                        (result) => {
                            this.toastr.success('The item was successfully updated ', 'Success');
                            this.dataService.load();
                        }, () => {
                            this.toastr.error('There was an error in updating the item', 'Error', {
                                timeOut: 0,
                            });
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
     * @deprecated
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
