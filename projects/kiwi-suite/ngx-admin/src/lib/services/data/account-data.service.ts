import { Injectable } from '@angular/core';
import { DataServiceAbstract } from './data.service.abstract';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AppDataService } from './app-data.service';

@Injectable()
export class AccountDataService extends DataServiceAbstract {

  constructor(protected api: ApiService,
              protected appData: AppDataService,
              protected store: Store<AppState>) {
    super(store);
  }

  login(username: string, password: string) {
    return this.api.post(this.appData.config.routes.authLogin, {username, password});
  }

}
