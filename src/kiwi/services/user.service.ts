import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {LoginCredentials, User} from '../models';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class UserService extends ApiService {
    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
    }

    get user$() {
        return this.fetch();
    }

    fetch() {
        return this.get<User>(this.config.params.routes.authUser);
    }

    login(credentials: LoginCredentials) {
        return this.post(this.config.params.routes.authLogin, credentials);
    }
}
