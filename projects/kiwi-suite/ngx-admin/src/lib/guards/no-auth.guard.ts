import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountDataService } from '../services/data/account-data.service';
import { RxService } from '../services/rx.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private accountData: AccountDataService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      RxService.getData(this.accountData.isAuthorized$).then((isAuthorized: User) => {
        if (!isAuthorized) {
          resolve(true);
        } else {
          this.router.navigateByUrl('/');
          resolve(false);
        }
      });
    });
  }
}
