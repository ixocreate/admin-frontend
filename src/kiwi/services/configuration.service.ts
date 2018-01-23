import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config, Navigation, Project, Routes} from '../models';

@Injectable()
export class ConfigurationService extends ApiService {

    params$: BehaviorSubject<Config> = new BehaviorSubject(<Config>{});

    private _params: Config;

    /**
     * @param {string} key
     * @returns {any}
     */
    static windowVar(key: string): any {
        if (typeof window === 'undefined') {
            return;
        }
        if (typeof window[key] === 'undefined') {
            return;
        }
        return window[key];
    }

    constructor(@Inject('Config') private baseConfig: Config, protected http: HttpClient) {
        super(http);
        this.bootstrap(baseConfig);
    }

    /**
     * @param baseConfig string|Config
     */
    private bootstrap(baseConfig: any = '__kiwi') {
        /**
         * determined by window key
         */
        if (typeof baseConfig === 'string') {
            baseConfig = ConfigurationService.windowVar(baseConfig);
        }
        this._params = <Config>Object.assign(<Config>{
            apiUrl: '',
            configUrl: '',
            navigation: [],
            project: <Project>{},
            routes: <Routes>{}
        }, baseConfig);

        // TODO: validate config - throw error in case something's missing

        this.params$.next(this._params);
    }

    load() {
        this.get(this._params.configUrl).toPromise()
            .then(response => {
                console.log(response);
                this._params = Object.assign(this._params, response);
            })
            .catch(error => {
                console.error(error);
            });
    }
}
