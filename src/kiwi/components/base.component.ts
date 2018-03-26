import {OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {AccountService} from '../services';
import {ResourceService} from '../services/resource.service';

/**
 * from: https://gist.github.com/pgiemza/1b81188e56ff24c977e605f9feb1d2f2
 * read: https://stackoverflow.com/a/41177163/580651
 */
export abstract class BaseComponent implements OnInit, OnDestroy {

    protected unsubscribeOnDestroy: Subject<boolean> = new Subject();

    constructor(protected dataService: ResourceService,
                protected accountService: AccountService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected toastr: ToastrService) {
    }

    ngOnInit() {
        this.dataService.load();
    }

    ngOnDestroy(): void {
        this.unsubscribeOnDestroy.next(true);
        this.unsubscribeOnDestroy.complete();
    }

    get model$() {
        return this.dataService.model$.takeUntil(this.unsubscribeOnDestroy);
    }

    get models$() {
        return this.dataService.models$.takeUntil(this.unsubscribeOnDestroy);
    }

    can$(ability) {
        return this.accountService.hasAbility$(ability);
    }
}
