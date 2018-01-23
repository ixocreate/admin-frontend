import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class SessionService extends ApiService {

    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
    }

    start() {
        return this.get(this.config.params.sessionUrl).toPromise();
    }
}
