import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataServiceAbstract } from './data.service.abstract';
import { Config } from '../../interfaces/config.interface';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { StoreAction } from '../../store/store.interface';
import { DefaultStore } from '../../store/default.store';
import { DefaultHelper } from '../../helpers/default.helper';

@Injectable()
export class AppDataService extends DataServiceAbstract {

  public config$: Observable<Config>;
  public config: Config = {
    navigation: [],
    routes: [],
  };
  public _navigation: any;

  constructor(protected api: ApiService, protected store: Store<AppState>) {
    super(store);
    this.addReducers();

    this.config$ = this.store.select('config');
    this.config$.subscribe((config) => {
      this.config = config;
    });

    this.saveToDefaultStore('CONFIG', Object.assign({}, this.config, DefaultHelper.windowVar('__kiwi')));
    this.loadConfig();
  }

  private addReducers() {
    this.store.addReducer('config', (state: any = null, action: StoreAction) => {
      return DefaultStore.Handle('CONFIG', action, state);
    });
  }

  loadConfig(): Promise<any> {
    return this.api.get(this.config.routes.config).then((data: Config) => {
      this.saveToDefaultStore('CONFIG', data);
      this.parseNavigation(data.navigation);
    });
  }

  get navigation() {
    return this._navigation;
  }

  private parseNavigation(navArray: Array<any>) {
    const navigation = [];

    for (const group of navArray) {
      navigation.push({
        title: true,
        name: group.name,
      });

      for (const item of group.children) {
        if (item.children.length === 0) {
          delete item.children;
        }
        navigation.push(item);
      }
    }

    this._navigation = navigation;
  }

}
