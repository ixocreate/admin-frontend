import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
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
         * in a production build there is no need to initialize the session by calling the session route
         * validate session immediately
         */
        if (this.config.environment.production) {
            this.ready();
        } else {
            this.logger.log('load session', this.config.params.routes.session);
            this.api.get<boolean>(this.config.params.routes.session).subscribe(() => this.ready());
        }
        return this.ready$;
    }
}
