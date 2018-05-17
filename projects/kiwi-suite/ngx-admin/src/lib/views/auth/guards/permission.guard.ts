import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../models';
import {AccountService, LoggerService} from '../../../services';

@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {
    constructor(private account: AccountService,
                private router: Router,
                private logger: LoggerService) {
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        /**
         * subscribe to async object to only have this triggered once
         */
        return this.account.user$.pipe(map(user => this.can(user, ['*'])));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // TODO: check session was bootstrapped as well instead of allowing not-yet existing users to activate (?)
        // if there's no user yet let them see the component until it was verified that the user has the permission to be there

        const urlParts = state.url.replace('/resource/', '/').split('/');
        let resource = urlParts[1];
        let action = 'index';

        if (state.url.indexOf('/edit') > -1) {
            action = 'edit';
        }
        if (state.url.indexOf('/create') > -1) {
            action = 'create';
        }

        const ability = 'admin.api.' + resource + '.' + action;

        // console.log(state.url);
        // console.log(urlParts);
        // console.log(resource);
        // console.log(route.data);
        // console.log(route.params);
        // console.log(state.url);
        // console.log(ability);
        // console.log(state);

        /**
         * subscribe to async object to only have this triggered once
         */
        return this.account.user$.pipe(
            map(user => {
                const can = this.can(user, [ability], true);
                if (!can) {
                    /**
                     * make sure it redirects to root
                     * the guard itself will just display the root component instead of actually redirecting
                     */
                    this.router.navigate(['/']);
                }
                return can;
            })
        );
    }

    can(user: User, abilities: string[], log = false) {
        let can = true;
        if (!user) {
            can = false;
        } else {
            abilities.map(ability => {
                const wildCardAbility = ability.split('.').slice(0, -1).join('.') + '.*';
                if (user.permissions.indexOf('*') > -1
                    || user.permissions.indexOf(wildCardAbility) > -1
                    || user.permissions.indexOf(ability) > -1) {
                    // all good
                } else {
                    can = false;
                }
            });
            if (log) {
                this.logger.log('[PermissionGuard]', abilities, can, user.permissions);
            }
        }
        return can;
    }
}
