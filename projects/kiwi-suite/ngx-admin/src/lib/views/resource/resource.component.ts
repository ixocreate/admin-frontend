import {OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AccountService, ApiService, ConfigurationService, DataStoreService} from '../../services';
import {AppInjector} from '../../services/app-injector.service';
import {ResourceService} from '../../services/resource/resource.service';

/**
 * from: https://stackoverflow.com/a/42490431/580651
 * from: https://gist.github.com/pgiemza/1b81188e56ff24c977e605f9feb1d2f2
 * read: https://stackoverflow.com/a/41177163/580651
 */
export abstract class ResourceComponent implements OnInit, OnDestroy {

    /**
     * "kill switch" for subscriptions
     * enable for observables: .takeUntil(this.destroyed$)
     *
     * @type {Subject<any>}
     */
    protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    protected _resourceKey: string;

    protected apiService: ApiService;
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected dataService: ResourceService;
    protected domSanitizer: DomSanitizer;
    protected accountService: AccountService;
    // protected route: ActivatedRoute;
    protected router: Router;
    protected toastr: ToastrService;

    constructor(protected route: ActivatedRoute) {
        this.apiService = AppInjector.get(ApiService);
        this.accountService = AppInjector.get(AccountService);
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.domSanitizer = AppInjector.get(DomSanitizer);
        this.router = AppInjector.get(Router);
        this.toastr = AppInjector.get(ToastrService);

        if (this._resourceKey) {
            this.dataService = this.dataStore.resource(this._resourceKey);
        } else {
            this.route.params.pipe(takeUntil(this.destroyed$))
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
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    can$(ability) {
        return this.accountService.hasAbility$(ability);
    }

    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
