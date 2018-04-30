import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'app-resource-detail',
    templateUrl: './resource-detail.component.html',
})
export class ResourceDetailComponent extends ResourceComponent implements OnInit, OnDestroy {

    protected action: string;
    protected pathPrefix = 'resource/';

    model: any;

    ngOnInit() {
        super.ngOnInit();
        this.model = {};

        this.route.data.subscribe((data: { action: string }) => {
            this.action = data.action;
            this.initModel();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model = {};
    }

    get model$() {
        return this.dataService.model$.takeUntil(this.unsubscribeOnDestroy);
    }

    get loading$() {
        return this.dataService.loading$;
    }

    get resourceKey() {
        return this.dataService.resourceKey;
    }

    get resourceName() {
        return this.dataService.resourceName;
    }

    get resourcePath() {
        return this.pathPrefix;
    }

    protected initModel() {
        this.route.params.takeUntil(this.unsubscribeOnDestroy)
            .subscribe(params => {
                this.dataService.find(params['id']).takeUntil(this.unsubscribeOnDestroy).subscribe(model => {
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
