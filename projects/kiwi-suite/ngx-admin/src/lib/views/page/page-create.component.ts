import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceCreateComponent} from "../resource/resource-create.component";
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'page-create',
    templateUrl: './page-create.component.html',
})
export class PageCreateComponent extends ResourceCreateComponent implements OnInit, OnDestroy {
    protected type = "page";
    protected parentSitemapId: string = null;
    protected locale: string;

    ngOnInit() {
        this.initDataService(this.type);
        this.initModel();
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
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
                this.router.navigate([this.pathPrefix + this.dataService.resourceKey, result.id, 'edit']);
            }, () => {
                this.toastr.error('There was an error in creating the ' + this.resourceKey, 'Error');
            });
    }
}
