import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/observable/of';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ResourceModelControl, ResourceModelSchema} from '../../../app/models/resource.model';
import {SchemaFormArray, SchemaFormBuilder} from '../../forms/schema-form-builder';
import {AccountService} from '../../services';
import {ResourceService} from '../../services/resource.service';
import {ResourceDetailComponent} from './resource-detail.component';

@Component({
    selector: 'app-resource-edit',
    templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ResourceDetailComponent implements OnInit, OnDestroy {

    private _formReady$ = new AsyncSubject();
    private _modelSub: Subscription;
    private _schemas: ResourceModelSchema[];
    private _routeParamsSub: Subscription;

    protected _action: string;
    protected _model: any;

    form: FormGroup;
    model: any;

    constructor(protected dataService: ResourceService,
                protected accountService: AccountService,
                protected formBuilder: SchemaFormBuilder,
                protected route: ActivatedRoute,
                protected router: Router,
                protected toastr: ToastrService) {
        super(dataService, accountService, route, router, toastr);
    }

    ngOnDestroy() {
        if (this._modelSub) {
            this._modelSub.unsubscribe();
        }
        if (this._routeParamsSub) {
            this._routeParamsSub.unsubscribe();
        }
        super.ngOnDestroy();
        this.model = null;
        this.form = null;
        this._formReady$ = null;
    }

    get action$() {
        return this.route.data.map((data: { action: string }) => data.action);
    }

    get dirty$() {
        return Observable.of(true);
        // return Observable.from(Object.values(this.form.controls))
        //     .filter(control => control.dirty)
        //     .subscribe(control => {
        //         console.log(control);
        //         // Here doing stuff with all your dirty control
        //     });
    }

    get formReady$() {
        return this._formReady$.asObservable();
    }

    protected initModel() {
        if (this._action === 'create') {
            this._model = {};
            this.resetForm();
        }
        if (this._action === 'edit') {
            this._routeParamsSub = this.route.params.subscribe(params => {
                this._modelSub = this.dataService.find(params['id']).subscribe(model => {
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
    }

    resetForm() {
        this.resetModel();
        this.initForm();
        this._formReady$.next(true);
        this._formReady$.complete();
    }

    protected buildFormFromSchemas(schemas: ResourceModelSchema[], schemaName: string) {
        this._schemas = schemas;
        const schema = this._schemas.find(_schema => _schema.name === schemaName);
        this.form = this.formBuilder.group(this.buildControls(schema, this.model), schema);
    }

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
     * todo add validators
     */
    buildControl(control: ResourceModelControl, data: any) {
        let schema = control.schema;
        if (typeof schema === 'string') {
            schema = this._schemas.find(_schema => _schema.name === schema);
        }
        if (schema && data) {
            return this.formBuilder.group(this.buildControls(schema, data), control);
        }
        return this.formBuilder.control(data, control);
    }

    addControl(control: SchemaFormArray, data: any) {
        console.log('schema', control.controlSchema);
        control.push(this.buildControl(control.controlSchema, data));
    }

    removeControl(control: FormArray, index) {
        control.removeAt(index);
    }

    onSubmit(action) {
        switch (action) {
            case 'create':
                this.dataService.create(this.model, this.form.getRawValue())
                    .subscribe(result => {
                        this.toastr.success('The item was successfully created ', 'Success');
                        // TODO: swapping directly to edit view is only possible if we know the model result consistently
                        // this._action = 'edit';
                        // this.initModel();
                        this.dataService.load();
                        this.router.navigate([this.dataService.resourceKey]);
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
}
