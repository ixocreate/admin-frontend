import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, skipWhile} from 'rxjs/operators';
import {LoginCredentials, User} from '../../models';
import {UserService} from './user.service';

@Injectable()
export class AccountService extends UserService {

    protected resource = 'account';

    protected _user$ = new BehaviorSubject<any>({});
    protected _user: User;

    get user$() {
        return this._user$.asObservable().pipe(
            /**
             * skip as long as there is an empty object
             */
            skipWhile(user => user && !user.id)
        );
    }

    load() {
        this._loading$.next(true);
        this.api.get<User>(this.config.params.routes.authUser)
            .subscribe(
                user => {
                    this._user = user;
                    this._user$.next(this._user);
                    return this._user;
                },
                () => {
                    this._user$.next(null);
                },
                () => {
                    this._loading$.next(false);
                    this.ready();
                });
    }

    hasAbility$(ability) {
        return this.user$.pipe(map(user => {
            // console.warn('HAS ABILITY', ability, user.role);
            return user && user.role && (user.role.indexOf('admin') > -1 || user.role.indexOf('editor') > -1);
        }));
    }

    login(credentials: LoginCredentials) {
        return this.api.post(this.config.params.routes.authLogin, credentials);
    }

    logout() {
        return this.api.post(this.config.params.routes.authLogout);
    }

    updateEmail(model: User, values) {
        return this.api.patch(this.config.params.routes['accountEmail'], values);
    }

    updatePassword(model: User, values) {
        return this.api.patch(this.config.params.routes['accountPassword'], values);
    }
}
