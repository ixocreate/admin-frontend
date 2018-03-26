import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
    selector: 'app-resource-detail',
    templateUrl: './resource-detail.component.html',
})
export class ResourceDetailComponent extends BaseComponent implements OnInit, OnDestroy {

    protected _action: string;
    model: any;

    ngOnInit() {
        this.model = {};
        this.route.data.subscribe((data: { action: string }) => {
            this._action = data.action;
            this.initModel();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.model = {};
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

    protected initModel() {
        this.route.params.subscribe(params => {
            this.dataService.find(params['id']).subscribe(model => {
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
                this.router.navigateByUrl(this.dataService.resourceKey);
            }, () => {
                this.toastr.error('There was an error in deleting the item', 'Error', {
                    timeOut: 0,
                });
            });
    }

    sanitizeUrl(url) {
        return this.dataService.sanitizeUrl(url);
    }
}
