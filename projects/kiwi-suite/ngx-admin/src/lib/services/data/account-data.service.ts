import { Injectable } from '@angular/core';
import { DataServiceAbstract } from './data.service.abstract';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AppDataService } from './app-data.service';
import { DefaultStore } from '../../store/default.store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class AccountDataService extends DataServiceAbstract {

  user$: Observable<User>;

  constructor(protected api: ApiService, protected appData: AppDataService, protected store: Store<AppState>) {
    super(store);

    this.store.addReducer('user', DefaultStore.Handle('USER'));

    this.user$ = this.loadFromStore('user', this.loadUser);
  }

  loadUser(): Promise<any> {
    return this.api.get(this.appData.config.routes.authUser).then((data: any) => {
      this.saveToDefaultStore('USER', data);
    });
  }

  updateEmail(email: string, emailRepeat: string) {
    return this.api.patch(this.appData.config.routes.accountEmail, {email, emailRepeat});
  }

  updatePassword(passwordOld: string, password: string, passwordRepeat: string) {
    return this.api.patch(this.appData.config.routes.accountPassword, {passwordOld, password, passwordRepeat});
  }

  login(email: string, password: string) {
    return this.api.post(this.appData.config.routes.authLogin, {email, password});
  }

  logout() {
    return this.api.post(this.appData.config.routes.authLogout);
  }

}
