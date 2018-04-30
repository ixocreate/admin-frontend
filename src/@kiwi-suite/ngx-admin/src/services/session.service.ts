import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from './api.service';
import {ConfigurationService} from './configuration.service';
import {DataService} from './data.service';
import {LoggerService} from './logger.service';

@Injectable()
export class SessionService extends DataService {

    private _subscription: Subscription;

    constructor(protected api: ApiService,
                protected config: ConfigurationService,
                private logger: LoggerService) {
        super(api);
        this.load();
    }

    load() {
        /**
         * load session only once
         */
        if (this._subscription) {
            return new Observable();
        }

        /**
         * in a production build there is no need to initialize the session by calling the session route
         * validate session immediately
         */
        if (this.config.environment.production) {
            this._subscription = new Subscription();
            this.ready();
        }
        this.logger.log('load session', this.config.params.routes.session);
        const observable = this.api.get<boolean>(this.config.params.routes.session);
        this._subscription = observable.subscribe(() => this.ready());
        return observable;
    }
}
