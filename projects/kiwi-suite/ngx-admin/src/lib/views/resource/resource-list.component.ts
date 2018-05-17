import {Component, OnInit, ViewChild} from '@angular/core';
import {map, takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'app-resource',
    templateUrl: './resource-list.component.html',
})
export class ResourceListComponent extends ResourceComponent implements OnInit {

    @ViewChild('dataTable') dataTable: any;

    protected pathPrefix = 'resource/';

    loadingIndicator = true;
    reorderable = true;
    limit = 10;

    timeout: any;

    get models$() {
        return this.dataService.models$.pipe(takeUntil(this.destroyed$));
    }

    get loading$() {
        return this.dataService.loading$;
    }

    get resourceKey() {
        return this.dataService.resourceKey;
    }

    get resourcePath() {
        return this.pathPrefix;
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.dataTable.rowDetail.toggleExpandRow(row);
    }

    onPage(event) {
        //     clearTimeout(this.timeout);
        //     this.timeout = setTimeout(() => {
        //         console.log('paged!', event);
        //     }, 100);
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
