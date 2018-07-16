import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-index',
    templateUrl: './resource-index.component.html',
})
export class ResourceIndexComponent extends ResourceComponent implements OnInit {

    offset:number = 0;
    
    constructor(protected route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                if (params.type) {
                    this.initDataService(params.type);
                }
            });
        this.route.data.pipe(takeUntil(this.destroyed$))
            .subscribe(data => {
                if (data.resource) {
                    this.initDataService(data.resource);
                }
            });
    }

    protected loadData(params: any = {}) {
        this.dataService.loadListData(params);
    }

    get data$() {
        return this.dataService.listData$;
    }

    onPage(event) {
        const offset = ((event.page - 1) * event.itemsPerPage);
        if (offset === this.offset) {
            return;
        }
        this.offset = offset;

        this.loadData({
            offset: this.offset,
            limit: event.itemsPerPage,
        });
    }

    onSort(event) {
        console.log('Sort Event', event);
    }
}
