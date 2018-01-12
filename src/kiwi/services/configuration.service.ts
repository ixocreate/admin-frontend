import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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

    constructor(baseConfig: Config, protected http: HttpClient) {
        super(http);
        this.bootstrap(baseConfig);
        this.applyEnvironmentOptions();
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
        this._params = Object.assign(new Config(), baseConfig);
        this.params$.next(this._params);
    }

    /**
     * applies environment settings from params
     */
    private applyEnvironmentOptions() {
        // TODO
    }

    load() {

    }
}

export class Config {
    apiUrl = '/api/';
    authPath = 'auth';
    configPath = 'config';
    project: ProjectConfig = <ProjectConfig>{};
}

export interface ProjectConfig {
    copyright: string;
    name: string;
    poweredBy?: boolean;
    version: string;
}
