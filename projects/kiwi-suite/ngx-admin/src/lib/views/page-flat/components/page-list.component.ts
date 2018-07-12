import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ResourceComponent} from "../../resource/resource.component";

@Component({
    selector: 'page-list',
    templateUrl: './page-list.component.html',
})
export class PageListComponent extends ResourceComponent{

    @ViewChild('dataTable') dataTable: any;

    @Input()
    locale: string;

    limit: number;
    loadingIndicator: boolean;
    reorderable: boolean;

    ngOnInit(): void {
        this.initDataService("page");
    }


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

    }
}
