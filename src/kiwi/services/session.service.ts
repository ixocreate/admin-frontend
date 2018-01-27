import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ConfigurationService} from './configuration.service';
import {environment} from '../../environments/environment';

@Injectable()
export class SessionService extends ApiService {

    private _session$ = new BehaviorSubject<boolean>(false);
    private _api$: Observable<boolean>;
    private _apiSub: Subscription;

    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
    }

    get session$() {
        /**
         * in a production build there is no need to initialize the session by calling the session route
         * validate session immediately
         */
        if (environment.production) {
            this._session$.next(true);
            return this._session$;
        }

        if (!this._apiSub) {
            this.fetch();
        }
        return this._session$;
    }

    private fetch() {
        this._api$ = this.get<boolean>(this.config.params.routes.session);
        this._apiSub = this._api$.subscribe(() => {
            this._session$.next(true);
        });
    }
}
