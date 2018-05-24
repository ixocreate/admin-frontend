import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'app-resource-detail',
    templateUrl: './resource-detail.component.html',
})
export class ResourceDetailComponent extends ResourceComponent implements OnInit, OnDestroy {

    protected action: string;

    model: any;

    ngOnInit() {
        super.ngOnInit();

        this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data: { action: string }) => {
            this.action = data.action;
            this.initModel();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model = {};
    }

    get model$() {
        return this.dataService.model$.pipe(takeUntil(this.destroyed$));
    }

    get loading$() {
        return this.dataService.loading$;
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.dataService.find(params['id']).pipe(takeUntil(this.destroyed$)).subscribe(model => {
                    if (!model) {
                        this.model = {};
                        return;
                    }
                    this.model = model;
                });
            });
    }

    onDelete() {
        this.dataService.delete(this.model)
            .subscribe(() => {
                this.toastr.success('The item was successfully deleted ', 'Success');
                /**
                 * navigating to index reloads models
                 */
                // this.dataService.load();
                this.router.navigateByUrl(this.pathPrefix + this.dataService.resourceKey);
            }, () => {
                this.toastr.error('There was an error in deleting the item', 'Error', {
                    timeOut: 0,
                });
            });
    }
}
