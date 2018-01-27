import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {LoginCredentials, User} from '../models';
import {ConfigurationService} from './configuration.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UserService extends ApiService {

    private _user: User;
    private _user$: BehaviorSubject<User>;
    private _userApi$: Observable<User>;
    private _userApiSub: Subscription;
    private _loginApi$: Observable<boolean>;
    private _loginApiSub: Subscription;

    constructor(protected http: HttpClient, private config: ConfigurationService) {
        super(http);
        this._user$ = new BehaviorSubject<User>(null);
    }

    get user$() {
        this.config.ready$.subscribe(configReady => {
            if (!configReady) {
                return;
            }
            if (!this._userApiSub) {
                this.fetch();
            }
        });
        return this._user$;
    }

    login(credentials: LoginCredentials) {
        this._loginApi$ = this.post<boolean>(this.config.params.routes.authLogin, credentials);
        this._loginApiSub = this._loginApi$.subscribe(user => {
            this.fetch();
        });
    }

    private fetch() {
        this._userApi$ = this.get<User>(this.config.params.routes.authUser);
        this._userApiSub = this._userApi$.subscribe(user => {
            this._user = user;
            this._user$.next(this._user);
            return this._user;
        });
    }
}
