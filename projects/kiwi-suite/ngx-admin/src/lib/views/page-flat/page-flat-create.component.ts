import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageCreateComponent} from "../page/page-create.component";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'page-flat-create',
    templateUrl: './page-flat-create.component.html',
})
export class PageFlatCreateComponent extends PageCreateComponent implements OnInit, OnDestroy {

    protected handle = "";

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.handle = params.handle;
                this.locale = params.locale;
                if (params.parentSitemapId) {
                    this.parentSitemapId = params.parentSitemapId;
                }

                this.dataService.loadCreateData({}, () => {
                    const url = this.config.params.routes['pageCreateSchema'];
                    if (this.parentSitemapId === null) {
                        return url.replace('[/{parentSitemapId}]', '');
                    }

                    return url.replace('[/{parentSitemapId}]', '/' + this.parentSitemapId);
                });
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

    onSubmit(): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the ' + this.resourceKey + '. Are all required fields entered?', 'Error');
            return;
        }
        let value = this.form.getRawValue();
        value['locale'] = this.locale;
        value['parentSitemapId'] = this.parentSitemapId;

        this.dataService.create(value)
            .subscribe((result: { id: string }) => {
                this.toastr.success('The ' + this.resourceKey + ' was successfully created', 'Success');
                this.router.navigate(["/page-flat/" + this.handle, result.id, 'edit']);
            }, () => {
                this.toastr.error('There was an error in creating the ' + this.resourceKey, 'Error');
            });
    }
}
