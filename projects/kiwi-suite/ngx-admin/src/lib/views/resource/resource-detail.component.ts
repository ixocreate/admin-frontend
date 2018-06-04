import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-detail',
    templateUrl: './resource-detail.component.html',
})
export class ResourceDetailComponent extends ResourceComponent implements OnInit, OnDestroy {

    protected action: string;

    model: any;

    constructor(protected route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.initDataService(params.type);
            });
        this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data: { action: string }) => {
            this.action = data.action;
            this.initModel();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model = null;
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.dataService.find(params['id']).pipe(takeUntil(this.destroyed$)).subscribe(
                    model => {
                        if (!model) {
                            this.model = {};
                            return;
                        }
                        this.model = model;
                    });
            });
    }

    onDelete() {
        if (!confirm('Are you sure?')) {
            return;
        }
        this.dataService.delete(this.model)
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
