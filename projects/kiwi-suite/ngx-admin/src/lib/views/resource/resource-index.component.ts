import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-index',
    templateUrl: './resource-index.component.html',
})
export class ResourceIndexComponent extends ResourceComponent implements OnInit {

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.initDataService(params.type);
            });
    }
}
