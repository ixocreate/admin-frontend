import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AccountDataService } from '../services/data/account-data.service';
import { RxService } from '../services/rx.service';
import { User } from '../interfaces/user.interface';
import { canActivateWithPermissions } from '../shared/userCanActivate';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private accountData: AccountDataService,
              private router: Router) {
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
        const can = canActivateWithPermissions(user.permissions, [ability]);
        if (can) {
          resolve(true);
        } else {
          this.router.navigateByUrl('/');
          resolve(false);
        }
      });
    });
  }
}
