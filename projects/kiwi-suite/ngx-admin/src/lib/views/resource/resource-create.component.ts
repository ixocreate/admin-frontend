import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';

import {of} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ResourceDetailComponent} from "./resource-detail.component";

@Component({
    selector: 'resource-create',
    templateUrl: './resource-create.component.html',
})
export class ResourceCreateComponent extends ResourceDetailComponent implements OnInit, OnDestroy {

    protected originalData: any;
    form: FormGroup;
    fields: FormlyFieldConfig[];

    constructor(protected route: ActivatedRoute) {
        super(route);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.originalData = null;
        this.form = null;
        this.data = null;
        this.fields = null;
    }

    get dirty$() {
        return of(true);
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.dataService.loadCreateData();
                this.dataService.createData$
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(data => {
                        if (!data) {
                            return;
                        }
                        this.originalData = data;
                        this.resetForm();
                    });
            });
    }

    protected resetModel() {
        this.data = Object.assign({}, this.originalData);
    }

    protected initForm() {
        this.form = new FormGroup({});
        if (this.data.schema) {
            this.fields = this.data.schema;
        }
    }

    protected resetForm() {
        this.resetModel();
        this.initForm();
    }

    get data$() {
        return this.dataService.createData$;
    }

    onSubmit(): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the ' + this.resourceKey + '. Are all required fields entered?', 'Error');
            return;
        }
        this.dataService.create(this.form.getRawValue())
            .subscribe((result: { id: string }) => {
                this.toastr.success('The ' + this.resourceKey + ' was successfully created', 'Success');
                this.router.navigate([this.pathPrefix + this.dataService.resourceKey, result.id, 'edit']);
            }, () => {
                this.toastr.error('There was an error in creating the ' + this.resourceKey, 'Error');
            });
    }
}
