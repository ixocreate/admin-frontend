import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class SessionService extends ApiService {

    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
    }

    fetch() {
        return this.get<boolean>(this.config.params.routes.session);
    }
}