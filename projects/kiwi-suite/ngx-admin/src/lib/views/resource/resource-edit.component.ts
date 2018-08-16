import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';

import {of} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ResourceDetailComponent} from "./resource-detail.component";

@Component({
    selector: 'resource-edit',
    templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent extends ResourceDetailComponent implements OnInit, OnDestroy {

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
                this.dataService.loadUpdateData(params['id']);
                this.dataService.updateData$
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
        return this.dataService.updateData$;
    }

    onSubmit(): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the ' + this.resourceKey + '. Are all required fields entered?', 'Error');
            return;
        }

        this.dataService.update(this.data.item, this.form.getRawValue())
            .subscribe(
                (result) => {
                    this.toastr.success('The ' + this.resourceKey + ' was successfully updated', 'Success');
                    /**
                     * loading the dataservice here causes the form to reinitialise
                     * which results in unexpected results (duplicating items in the form raw model)
                     */

                    this.dataService.loadUpdateData(this.data.item.id);
                }, () => {
                    this.toastr.error('An error occurred while saving the ' + this.resourceKey, 'Error');
                }
            );
    }
}
