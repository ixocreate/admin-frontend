import {Component, OnInit, ViewChild} from '@angular/core';
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
        return this.dataService.models$.takeUntil(this.unsubscribeOnDestroy);
    }

    get schema$() {
        return this.dataService.schema$.takeUntil(this.unsubscribeOnDestroy);
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

    get resourceNamePlural() {
        return this.dataService.resourceName + 's';
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
