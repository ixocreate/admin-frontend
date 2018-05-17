import {OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {
    AccountService,
    ApiService,
    AppInjector,
    ConfigurationService,
    DataStoreService,
    ResourceService
} from '../../services';

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
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    protected _resourceKey: string;

    protected pathPrefix = 'resource/';

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

    get destroyed$() {
        return this._destroyed$.asObservable();
    }

    get resourceName$() {
        return this.schema$.pipe(map(schema => schema.name));
    }

    get resourceNamePlural$() {
        return this.schema$.pipe(map(schema => schema.namePlural));
    }

    get resourceKey() {
        return this.dataService.resourceKey;
    }

    get resourcePath() {
        return this.pathPrefix;
    }

    get schema$() {
        return this.dataService.schema$.pipe(takeUntil(this.destroyed$));
    }

    ngOnInit() {
        this.dataService.load();
    }

    ngOnDestroy(): void {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    can$(ability) {
        return this.accountService.hasAbility$(ability);
    }

    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
