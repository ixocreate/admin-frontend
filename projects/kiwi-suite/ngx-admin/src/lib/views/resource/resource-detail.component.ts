import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-detail',
    templateUrl: './resource-detail.component.html',
})
export class ResourceDetailComponent extends ResourceComponent implements OnInit, OnDestroy {

    data: any;

    constructor(protected route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.initDataService(params.type);
            });
        this.route.data.pipe(takeUntil(this.destroyed$))
            .subscribe(data => {
                if (data.resource) {
                    this.initDataService(data.resource);
                }
            });

        this.initModel();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.data = null;
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.dataService.loadUpdateData(params['id']);
                this.dataService.updateData$
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(data => {
                        if (!data) {
                            this.data = {};
                            return;
                        }
                        this.data = data;
                    });
            });
    }

    onDelete() {
        this.dataService.delete(this.data.item)
            .subscribe(() => {
                this.toastr.success('The item was successfully deleted ', 'Success');
                /**
                 * navigating to index reloads models
                 */
                // this.dataService.load();
                this.router.navigateByUrl(this.pathPrefix + this.dataService.resourceKey);
            }, () => {
                this.toastr.error('There was an error in deleting the item', 'Error');
            });
    }
}
