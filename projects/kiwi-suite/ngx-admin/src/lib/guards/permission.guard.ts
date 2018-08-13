import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountDataService } from '../services/data/account-data.service';
import { RxService } from '../services/rx.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private accountData: AccountDataService,
              private router: Router) {
  }

  can(user: User, abilities: string[]) {
    let can = true;
    if (!user || !user.id) {
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
    }
    return can;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const urlParts = state.url.replace('/resource/', '/').split('/');
      const resource = urlParts[1];
      let action = 'index';
      if (state.url.indexOf('/edit') > -1) {
        action = 'edit';
      } else if (state.url.indexOf('/create') > -1) {
        action = 'create';
      }
      const ability = 'admin.api.' + resource + '.' + action;
      RxService.getData(this.accountData.user$).then((user: User) => {
        const can = this.can(user, [ability]);
        if (!can) {
          this.router.navigateByUrl('/');
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
