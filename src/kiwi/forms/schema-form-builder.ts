import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';
import {AbstractControl, AbstractControlOptions} from '@angular/forms/src/model';
import {ResourceModelSchema} from '../../app/models/resource.model';

@Injectable()
export class SchemaFormBuilder extends FormBuilder {

    array(controlsConfig: any[],
          controlSchema?: any,
          validator?: ValidatorFn | null,
          asyncValidator?: AsyncValidatorFn | null): SchemaFormArray {
        return new SchemaFormArray(controlsConfig, controlSchema, validator, asyncValidator);
    }

    control(formState: any,
            controlSchema?: any,
            validator?: ValidatorFn | ValidatorFn[] | null,
            asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): SchemaFormControl {
        return new SchemaFormControl(formState, controlSchema, validator, asyncValidator);
    }

    group(controlsConfig: { [key: string]: any; },
          controlSchema?: any,
          extra?: { [key: string]: any; } | null): SchemaFormGroup {
        return new SchemaFormGroup(controlsConfig, controlSchema, extra);
    }

}

export class SchemaFormArray extends FormArray {

    private _controlSchema: ResourceModelSchema;

    constructor(controls: AbstractControl[],
                controlSchema?: ResourceModelSchema,
                validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
        this._controlSchema = controlSchema;
    }

    get controlSchema() {
        return this._controlSchema;
    }

    get label() {
        return this._controlSchema && (this._controlSchema.label || this._controlSchema.name);
    }

    get labelPlural() {
        return this._controlSchema && (this._controlSchema.labelPlural || this.label);
    }
}

export class SchemaFormControl extends FormControl {

    private _controlSchema: ResourceModelSchema;

    constructor(controls: AbstractControl[],
                controlSchema?: ResourceModelSchema,
                validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
        this._controlSchema = controlSchema;
    }

    get controlSchema() {
        return this._controlSchema;
    }

    get label() {
        return this._controlSchema && (this._controlSchema.label || this._controlSchema.name);
    }

    get labelPlural() {
        return this._controlSchema && (this._controlSchema.labelPlural || this.label);
    }
}

export class SchemaFormGroup extends FormGroup {

    private _controlSchema: ResourceModelSchema;

    constructor(controls: { [key: string]: AbstractControl; },
                controlSchema?: ResourceModelSchema,
                validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
        this._controlSchema = controlSchema;
    }

    get controlSchema() {
        return this._controlSchema;
    }

    get label() {
        return this._controlSchema && (this._controlSchema.label || this._controlSchema.name);
    }

    get labelPlural() {
        return this._controlSchema && (this._controlSchema.labelPlural || this.label);
    }
}
