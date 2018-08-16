import {OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AccountService, ApiService, AppInjector, ConfigurationService, DataStoreService, ResourceService} from '../../services';

/**
 * from: https://stackoverflow.com/a/42490431/580651
 * from: https://gist.github.com/pgiemza/1b81188e56ff24c977e605f9feb1d2f2
 * read: https://stackoverflow.com/a/41177163/580651
 */
export abstract class ResourceComponent implements OnDestroy, OnInit {

    /**
     * "kill switch" for subscriptions
     * enable for observables: .takeUntil(this.destroyed$)
     *
     * @type {Subject<any>}
     */
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    /**
     * set a type on a component to receive a generic resource data service
     * to use a specialized data service inject it in the component's constructor
     */
    protected type: string;

    /**
     * manually injected services
     */
    protected dataService: ResourceService;
    protected apiService: ApiService;
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected domSanitizer: DomSanitizer;
    protected accountService: AccountService;
    protected router: Router;
    protected toastr: ToastrService;

    constructor() {
        this.apiService = AppInjector.get(ApiService);
        this.accountService = AppInjector.get(AccountService);
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.domSanitizer = AppInjector.get(DomSanitizer);
        this.router = AppInjector.get(Router);
        this.toastr = AppInjector.get(ToastrService);
    }

    get destroyed$() {
        return this._destroyed$.asObservable();
    }

    get resourcePathPrefix() {
        return this.pathPrefix;
    }

    get resourceKey() {
        return this.dataService.resourceKey;
    }

    get loading$() {
        return this.dataService.loading$.pipe(takeUntil(this.destroyed$));
    }

    get pathPrefix() {
        return this.dataService.pathPrefix;
    }

    ngOnInit(): void {
        if (!this.dataService) {
            this.initDataService();
        }
    }

    protected loadData() {

    }

    protected initDataService(type: string = null) {

        if (this.dataService && this.dataService.resourceKey === type) {
            this.loadData();
            return;
        }

        /**
         * get type either from route param or from component
         * @type {string}
         */
        let _type = type || this.type;
        if (_type) {
            this.dataService = this.dataStore.resource(_type);
        }

        /**
         * injected dataServices need their type extracted and manually registered in dataStore
         */
        if (this.dataService) {
            this.dataStore.register(this.dataService);
        }

        this.loadData();
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
