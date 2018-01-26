import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {LoginCredentials, User} from '../models';
import {ConfigurationService} from './configuration.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService extends ApiService {

    private _user: User;

    user$: BehaviorSubject<User>;

    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
        this.user$ = new BehaviorSubject<User>(null);
    }

    fetch() {
        return this.get<User>(this.config.params.routes.authUser).map(user => {
            this._user = user;
            this.user$.next(this._user);
        });
    }

    login(credentials: LoginCredentials) {
        return this.post(this.config.params.routes.authLogin, credentials);
    }
}
