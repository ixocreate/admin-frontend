import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from './services';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private user: UserService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // TODO: check session was bootstrapped as well instead of allowing not-yet existing users to activate (?)
        // if there's no user yet let them see the component until it was verified that the user has the permission to be there
        return this.user.user$.map(user => !user ? true : user.id === 1);
    }
}
