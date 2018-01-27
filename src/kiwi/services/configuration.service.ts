import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BootstrapError, Config, Project, Routes} from '../models';
import {LoggerService} from './logger.service';

@Injectable()
export class ConfigurationService extends ApiService {

    private _api$;
    private _apiSub: Promise<PushSubscription>;
    private _ready$ = new BehaviorSubject<boolean>(false);
    private _params: Config;
    private _params$ = new BehaviorSubject<Config>(<Config>{});
    loading = true;

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
                protected http: HttpClient,
                private logger: LoggerService) {
        super(http);
        this.bootstrap(baseConfig);
    }

    get ready$() {
        return this._ready$;
    }

    get params() {
        return this._params;
    }

    get params$() {
        return this._params$;
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

    load() {
        this.logger.log('load configuration', this._params.routes.config);

        this._api$ = this.get<Config>(this._params.routes.config)
            .map(params => {
                this._params = Object.assign(this._params, params);
                this._params$.next(this._params);
                // if (!this._params.routes.authLogin || !this._params.routes.authUser || !this._params.routes.authLogout) {
                //     throw new BootstrapError('missing auth routes');
                // }
            });

        this._apiSub = this._api$.subscribe(
            () => {
                this._ready$.next(true);
            },
            () => {
                this._ready$.next(false);
                this.loading = false;
                throw new BootstrapError('failed to initialize configuration');
            },
            () => {
                this.loading = false;
            });

        return this._api$;
    }
}
