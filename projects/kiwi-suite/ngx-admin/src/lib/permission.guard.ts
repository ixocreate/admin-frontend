
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from './services';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private account: AccountService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // TODO: check session was bootstrapped as well instead of allowing not-yet existing users to activate (?)
        // if there's no user yet let them see the component until it was verified that the user has the permission to be there

        // console.log(next);
        // console.log(state);

        /**
         * subscribe to async object to only have this triggered once
         */
        return this.account.user$.pipe(map(user => this.can(user, '*')));
    }

    can(user, ability) {
        console.warn('CAN', user.permissions, ability, user.permissions.indexOf(ability) > -1);
        return user.permissions.indexOf(ability) > -1;
    }
}
