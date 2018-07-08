import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from '../../../services';
import {ResourceComponent} from '../resource.component';

@Component({
    selector: 'resource-list',
    templateUrl: './resource-list.component.html',
})
export class ResourceListComponent extends ResourceComponent{

    @Input('dataService') protected dataService: ResourceService;

    @ViewChild('dataTable') dataTable: any;

    limit: number;
    loadingIndicator: boolean;
    reorderable: boolean;

    // toggleExpandRow(row) {
    //     console.log('Toggled Expand Row!', row);
    //     this.dataTable.rowDetail.toggleExpandRow(row);
    // }
    //
    // onPage(event) {
    //     //     clearTimeout(this.timeout);
    //     //     this.timeout = setTimeout(() => {
    //     //         console.log('paged!', event);
    //     //     }, 100);
    // }
    //
    // onDetailToggle(event) {
    //     console.log('Detail Toggled', event);
    // }

    // toggleExpandRow(row) {
    //     console.log('Toggled Expand Row!', row);
    //     this.dataTable.rowDetail.toggleExpandRow(row);
    // }
    //
    // onPage(event) {
    //     clearTimeout(this.timeout);
    //     this.timeout = setTimeout(() => {
    //         console.log('paged!', event);
    //     }, 100);
    // }
    //
    // onDetailToggle(event) {
    //     console.log('Detail Toggled', event);
    // }

    get data$() {
        return this.dataService.listData$;
    }

    protected loadData() {
        this.dataService.loadListData();
    }
}
