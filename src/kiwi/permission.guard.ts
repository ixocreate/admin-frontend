import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AccountService} from './services';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private account: AccountService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // TODO: check session was bootstrapped as well instead of allowing not-yet existing users to activate (?)
        // if there's no user yet let them see the component until it was verified that the user has the permission to be there
        // TODO: get from routes definition
        // this.config.route

        return this.account.user$.map(user => this.can(user, '*'));
    }

    can(user, ability) {
        console.warn('CAN', user, ability, user.permissions.indexOf(ability) > -1);
        return user.permissions.indexOf(ability) > -1;
    }
}
