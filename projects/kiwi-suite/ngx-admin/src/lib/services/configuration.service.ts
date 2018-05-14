import {Inject, Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {BootstrapError, Config, Project, Routes} from '../models';
import {ApiService} from './api.service';
import {DataService} from './data.service';
import {LoggerService} from './logger.service';

@Injectable()
export class ConfigurationService extends DataService {

    private _params: Config;
    private _params$ = new BehaviorSubject<Config>(<Config>{});

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

    get environment() {
        return this._params.environment;
    }

    get navigation() {
        return this._params.navigation;
    }

    /**
     * @param baseConfig string|Config
     */
    private bootstrap(baseConfig: any = '__kiwi') {
        this.logger.log('bootstrap configuration', baseConfig);
        if (typeof baseConfig === 'string') {
            /**
             * check window key in case a base config string was given
             */
            baseConfig = ConfigurationService.windowVar(baseConfig);
        } else {
            /**
             * otherwise assume default window key and have given config merged on top
             */
            baseConfig = Object.assign(ConfigurationService.windowVar('__kiwi'), baseConfig);
        }
        this._params = <Config>Object.assign(<Config>{
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

    load() {
        this.logger.log('load configuration', this._params.routes.config);

        this.api.get<Config>(this._params.routes.config).pipe(
            map(params => {
                this._params = Object.assign(this._params, params);
                this._params$.next(this._params);
                // if (!this._params.routes.authLogin || !this._params.routes.authUser || !this._params.routes.authLogout) {
                //     throw new BootstrapError('missing auth routes');
                // }
            })
        ).subscribe(
            () => {
            },
            error => {
                // console.error(error);
                throw new BootstrapError('failed to initialize configuration');
            },
            () => {
                this.ready();
            }
        );

        return this.ready$;
    }
}
