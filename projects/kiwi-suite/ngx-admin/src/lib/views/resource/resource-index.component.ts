import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-index',
    templateUrl: './resource-index.component.html',
})
export class ResourceIndexComponent extends ResourceComponent implements OnInit
{

    offset:number = 0;

    currentPage: number = 1;
    
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
        if (!params.offset) {
            this.offset = 0;
            this.currentPage = 1;
        }
        this.dataService.loadListData(params);
    }

    get data$() {
        return this.dataService.listData$;
    }

    onPage(event) {
        if (this.currentPage === event.page) {
            return;
        }
        this.currentPage = event.page;
        this.offset = ((event.page - 1) * event.itemsPerPage);

        this.loadData({
            offset: this.offset,
            limit: event.itemsPerPage,
        });
    }

    onSort(event) {
    }
}
