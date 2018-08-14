import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataServiceAbstract } from './data.service.abstract';
import { Config } from '../../interfaces/config.interface';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { DefaultStore } from '../../store/default.store';
import { DefaultHelper } from '../../helpers/default.helper';
import { ConfigService } from '../config.service';
import { tap } from 'rxjs/internal/operators';
import { parseParams } from '../../shared/parseParams';

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

  getResourceIndex(resource: string, limit: number = 10, pageNumber: number = 0, search: string = null) {
    const params: any = {
      offset: (pageNumber - 1) * limit,
      limit: limit,
    };
    if (search && search !== '') {
      params.search = search;
    }
    return this.api.get(this.config.appConfig.routes.resourceIndex.replace('{resource}', resource) + '?' + parseParams(params));
  }

  getResourceDetail(resource: string, id: string) {
    return this.api.get(this.config.appConfig.routes.resourceDetail.replace('{resource}', resource).replace('{id}', id));
  }

  createResource(resource: string, data: any) {
    return this.api.post(this.config.appConfig.routes.resourceCreate.replace('{resource}', resource), data);
  }

  createResourceDetail(resource: string, id: string, data: any) {
    return this.api.post(this.config.appConfig.routes.resourceCreateDetail.replace('{resource}', resource).replace('{id}', id), data);
  }

  updateResource(resource: string, id: string, data: any) {
    return this.api.patch(this.config.appConfig.routes.resourceUpdate.replace('{resource}', resource).replace('{id}', id), data);
  }

  deleteResource(resource: string, id: string) {
    return this.api.delete(this.config.appConfig.routes.resourceDelete.replace('{resource}', resource).replace('{id}', id));
  }

}
