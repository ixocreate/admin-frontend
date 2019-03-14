import { Injectable } from '@angular/core';
import { DataServiceAbstract } from './data.service.abstract';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { DefaultStore } from '../../store/default.store';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { ConfigService } from '../config.service';

@Injectable()
export class AccountDataService extends DataServiceAbstract {

  user$: Observable<User>;

  constructor(protected api: ApiService, protected config: ConfigService, protected store: Store<AppState>) {
    super(store);

    this.store.addReducer('user', DefaultStore.Handle('USER'));

    this.user$ = this.loadFromStore('user', this.loadUser);
    this.user$.subscribe((user) => {
      this.config.setUserPermissions(user ? user.permissions : null);
      this.config.setUser(user);
    });
  }

  loadUser(): Promise<any> {
    return this.api.get(this.config.config.routes.authUser).then((data: any) => {
      this.saveToDefaultStore('USER', data);
    });
  }

  getAccountConfig(): Promise<any> {
    return this.api.get(this.config.config.routes.accountConfig);
  }

  updateAccountAttributes(data: any) {
    return this.api.patch(this.config.config.routes.accountAttributes, {data});
  }

  updateEmail(email: string, emailRepeat: string) {
    return this.api.patch(this.config.config.routes.accountEmail, {email, emailRepeat});
  }

  updatePassword(passwordOld: string, password: string, passwordRepeat: string) {
    return this.api.patch(this.config.config.routes.accountPassword, {passwordOld, password, passwordRepeat});
  }

  updateLocale(data: any) {
    return this.api.patch(this.config.config.routes.accountLocale, data).then(() => {
      /**
       * TODO: reload user instead -> should cascade through to config
       */
      window.location.reload();
    });
  }
}
