import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
    selector: 'app-resource',
    templateUrl: './resource-list.component.html',
})
export class ResourceListComponent extends BaseComponent implements OnInit {

    @ViewChild('dataTable') dataTable: any;

    protected resource: string;

    loadingIndicator = true;
    reorderable = true;
    limit = 10;

    timeout: any;

    get loading$() {
        return this.dataService.loading$;
    }

    get resourceKey() {
        return this.dataService.resourceKey;
    }

    get resourceName() {
        return this.dataService.resourceName;
    }

    sanitizeUrl(url) {
        return this.dataService.sanitizeUrl(url);
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.dataTable.rowDetail.toggleExpandRow(row);
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }

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
}
