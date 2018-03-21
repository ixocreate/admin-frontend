import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {BootstrapError, Config, Project, Routes} from '../models';
import {ApiService} from './api.service';
import {DataService} from './data.service';
import {LoggerService} from './logger.service';

@Injectable()
export class ConfigurationService extends DataService {

    private _params: Config;
    private _params$ = new BehaviorSubject<Config>(<Config>{});

    private _subscription: Subscription;

    /**
     * @param {string} key
     */
    private static windowVar(key: string): any {
        if (typeof window === 'undefined') {
            return;
        }
        if (typeof window[key] === 'undefined') {
            return;
        }
        return window[key];
    }

    constructor(@Inject('Config') private baseConfig: Config,
                protected api: ApiService,
                private logger: LoggerService) {
        super(api);
        this.bootstrap(baseConfig);
    }

    get params$() {
        return this._params$.asObservable();
    }

    get params() {
        return this._params;
    }

    /**
     * @param baseConfig string|Config
     */
    private bootstrap(baseConfig: any = '__kiwi') {
        this.logger.log('bootstrap configuration', baseConfig);
        /**
         * check window key in case a base config string was given
         */
        if (typeof baseConfig === 'string') {
            baseConfig = ConfigurationService.windowVar(baseConfig);
        }
        this._params = <Config>Object.assign(<Config>{
            assetsUrl: '/assets',
            navigation: [],
            project: <Project>{},
            routes: <Routes>{}
        }, baseConfig);

        /**
         * TODO: validate config - throw error in case something's missing
         */
        // if (!this._params.routes.config || !this._params.routes.session) {
        //     throw new BootstrapError('missing config and session route');
        // }

        this._params$.next(this._params);
    }

    /**
     * @returns {Observable<Config>}
     */
    load() {
        this.logger.log('load configuration', this._params.routes.config);

        const observable = this.api.get<Config>(this._params.routes.config);

        this._subscription = observable.map(params => {
            this._params = Object.assign(this._params, params);
            this._params$.next(this._params);
            // if (!this._params.routes.authLogin || !this._params.routes.authUser || !this._params.routes.authLogout) {
            //     throw new BootstrapError('missing auth routes');
            // }
        }).subscribe(
            () => {
            },
            () => {
                throw new BootstrapError('failed to initialize configuration');
            },
            () => {
                this.ready();
            });

        return observable;
    }
}
