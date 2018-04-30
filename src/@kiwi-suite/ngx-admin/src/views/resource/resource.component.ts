import {OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {AccountService, DataStoreService} from '../../services';
import {AppInjector} from '../../services/app-injector.service';
import {ResourceService} from '../../services/resource/resource.service';

/**@
 * from: https://gist.github.com/pgiemza/1b81188e56ff24c977e605f9feb1d2f2
 * read: https://stackoverflow.com/a/41177163/580651
 */
export abstract class ResourceComponent implements OnInit, OnDestroy {

    /**
     * "kill switch" for subscriptions
     * enable for observables: .takeUntil(this.unsubscribeOnDestroy)
     *
     * @type {Subject<any>}
     */
    protected unsubscribeOnDestroy: Subject<boolean> = new Subject();

    protected _resourceKey: string;

    protected dataStore: DataStoreService;
    protected accountService: AccountService;
    protected toastr: ToastrService;
    // protected route: ActivatedRoute;
    protected router: Router;
    protected dataService: ResourceService;
    protected domSanitizer: DomSanitizer;

    constructor(protected route: ActivatedRoute) {
        this.accountService = AppInjector.get(AccountService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.domSanitizer = AppInjector.get(DomSanitizer);
        this.router = AppInjector.get(Router);
        this.toastr = AppInjector.get(ToastrService);

        if (this._resourceKey) {
            this.dataService = this.dataStore.resource(this._resourceKey);
        } else {
            this.route.params.takeUntil(this.unsubscribeOnDestroy)
                .subscribe(params => {
                    if (params.type) {
                        this.dataService = this.dataStore.resource(params.type);
                    }
                });
        }
    }

    ngOnInit() {
        this.dataService.load();
    }

    ngOnDestroy(): void {
        this.unsubscribeOnDestroy.next(true);
        this.unsubscribeOnDestroy.complete();
    }

    can$(ability) {
        return this.accountService.hasAbility$(ability);
    }

    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
