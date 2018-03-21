import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoginCredentials, User} from '../models';
import {ApiService} from './api.service';
import {ConfigurationService} from './configuration.service';
import {UserService} from './user.service';

@Injectable()
export class AccountService extends UserService {

    protected _user$ = new AsyncSubject<User>();
    protected _model$: BehaviorSubject<User>;
    protected _model: User;

    constructor(protected api: ApiService,
                protected config: ConfigurationService,
                protected domSanitizer: DomSanitizer) {
        super(api, config, domSanitizer);
    }

    get user$() {
        return this._user$.asObservable();
    }

    load() {
        this._loading$.next(true);
        this.api.get<User>(this.config.params.routes.authUser)
            .subscribe(user => {
                    this._model = user;
                    this._model$.next(this._model);
                    this._user$.next(this._model);
                    this._user$.complete();
                    return this._model;
                }, () => {
                },
                () => {
                    this._loading$.next(false);
                    this.ready();
                });
    }

    hasAbility$(ability) {
        return this.user$.map(user => {
            // console.warn('HAS ABILITY', ability, user.role);
            return user && user.role && (user.role.indexOf('admin') > -1 || user.role.indexOf('editor') > -1);
        });
    }

    login(credentials: LoginCredentials) {
        return this.api.post(this.config.params.routes.authLogin, credentials);
    }

    logout() {
        return this.api.post(this.config.params.routes.authLogout);
    }

    sendResetPasswordEmail(param: any) {
        return this.api.post(this.config.params.routes.passwordEmail, param);
    }

    updateAvatar(model: User) {
        // TODO
        console.log(this.config.params.routes.accountAvatar, model);
    }

    updateEmail(model: User, values) {
        return this.api.patch(this.config.params.routes['accountEmail'], values);
    }

    updatePassword(model: Account, values) {
        return this.api.patch(this.config.params.routes['accountPassword'], values);
    }
}
