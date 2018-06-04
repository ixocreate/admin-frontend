import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ResourceComponent} from './resource.component';

@Component({
    selector: 'resource-index',
    templateUrl: './resource-index.component.html',
})
export class ResourceIndexComponent extends ResourceComponent implements OnInit {

    constructor(protected route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.initDataService(params.type);
            });
    }
}
