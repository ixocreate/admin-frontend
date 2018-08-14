import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataServiceAbstract } from './data.service.abstract';
import { Config } from '../../interfaces/config.interface';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { DefaultStore } from '../../store/default.store';
import { DefaultHelper } from '../../helpers/default.helper';
import { AccountDataService } from './account-data.service';
import { ConfigService } from '../config.service';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class AppDataService extends DataServiceAbstract {

  config$: Observable<Config>;
  session$: Observable<any>;


  constructor(protected api: ApiService,
              protected store: Store<AppState>,
              protected config: ConfigService) {
    super(store);

    this.store.addReducer('session', DefaultStore.Handle('SESSION'));
    this.config.setAppConfig({});
    this.store.addReducer('config', DefaultStore.Handle('CONFIG', this.config.appConfig));

    this.session$ = this.loadFromStore('session', this.loadSession);
    this.config$ = this.store.select('config').pipe(tap((configResponse) => {
      this.config.setAppConfig(configResponse);
    }));
  }

  loadSession(): Promise<any> {
    return this.api.get(this.config.appConfig.routes.session).then((data: any) => {
      this.saveToDefaultStore('SESSION', data);
    });
  }

  loadConfig(): Promise<any> {
    return this.api.get(this.config.appConfig.routes.config).then((data: Config) => {
      this.saveToDefaultStore('CONFIG', Object.assign({}, this.config, DefaultHelper.windowVar('__kiwi'), data));
    });
  }

  getTranslationCatalogue(): Promise<any> {
    return this.api.get(this.config.appConfig.routes.translationCatalogue);
  }

  getTranslationDetail(catalogue: string, definitionId: string): Promise<any> {
    return this.api.get(this.config.appConfig.routes.translationDetail.replace('{catalogue}', catalogue).replace('{id}', definitionId));
  }

  saveTranslation(locale: string, definitionId: string, id: string, message: string) {
    return this.api.post(this.config.appConfig.routes.translationSave, {locale, definitionId, id, message});
  }

}
