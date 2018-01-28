import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from './services';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private user: UserService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // return true;
        // TODO: check session was bootstrapped as well instead of allowing not-yet exsting users to activate
        // returning false when user was not yet set results in immediate redirect to root
        return this.user.user$.map(user => !user ? true : user.id === 1);
    }
}
