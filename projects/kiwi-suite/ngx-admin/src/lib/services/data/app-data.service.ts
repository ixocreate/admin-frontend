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
import { ResourceList } from '../../interfaces/resource-list.interface';
import { Resource } from '../../interfaces/resource.interface';
import { Page } from '../../interfaces/page.interface';

@Injectable()
export class AppDataService extends DataServiceAbstract {

  config$: Observable<Config>;
  session$: Observable<any>;

  savedResourceSelects: { [key: string]: any } = {};

  constructor(protected api: ApiService,
              protected store: Store<AppState>,
              protected config: ConfigService) {
    super(store);

    this.store.addReducer('session', DefaultStore.Handle('SESSION'));
    this.config.setConfig({});
    this.store.addReducer('config', DefaultStore.Handle('CONFIG', this.config.config));

    this.session$ = this.loadFromStore('session', this.loadSession);
    this.config$ = this.store.select('config').pipe(tap((configResponse) => {
      this.config.setConfig(configResponse);
    }));
  }

  clearSavedResourceSelects() {
    this.savedResourceSelects = {};
  }

  loadSession(): Promise<any> {
    return this.api.get(this.config.config.routes.session).then((data: any) => {
      this.saveToDefaultStore('SESSION', data);
    });
  }

  loadConfig(): Promise<any> {
    return this.api.get(this.config.config.routes.config).then((data: Config) => {
      this.saveToDefaultStore('CONFIG', Object.assign({}, DefaultHelper.windowVar('__kiwi'), data));
    });
  }

  getPageIndex(): Promise<{ allowedAddingRoot: boolean, items: Array<Page> }> {
    return this.api.get(this.config.config.routes.pageIndex);
  }

  postPageMove(sitemapId: string, prevSiblingSitemapId: string, parentSitemapId: string): Promise<any> {
    return this.api.post(this.config.config.routes.pageMove, {
      id: sitemapId,
      prevSibling: prevSiblingSitemapId,
      parent: parentSitemapId,
    });
  }

  getPageDetail(pageId: string): Promise<any> {
    return this.api.get(this.config.config.routes.pageDetail.replace('{id}', pageId));
  }

  getPageVersionDetail(pageId: string, pageVersionId: string): Promise<any> {
    return this.api.get(this.config.config.routes.pageVersionDetail.replace('{pageId}', pageId).replace('{id}', pageVersionId));
  }

  getTranslationCatalogue(): Promise<any> {
    return this.api.get(this.config.config.routes.translationCatalogue);
  }

  getTranslationDetail(catalogue: string, definitionId: string): Promise<any> {
    return this.api.get(this.config.config.routes.translationDetail.replace('{catalogue}', catalogue).replace('{id}', definitionId));
  }

  saveTranslation(locale: string, definitionId: string, id: string, message: string) {
    return this.api.post(this.config.config.routes.translationSave, {locale, definitionId, id, message});
  }

  pageVersionIndex(pageId: any) {
    return this.api.get(this.config.config.routes.pageVersionIndex.replace('{pageId}', pageId));
  }

  savePageVersion(data: any) {
    return this.api.post(this.config.config.routes.pageVersionReplace, data);
  }

  getPageCreateSchema(parentSitemapId: string = null) {
    return this.api.get(this.config.config.routes.pageCreateSchema.replace('[/{parentSitemapId}]', parentSitemapId ? '/' + parentSitemapId : ''));
  }

  /* PAGE */

  updatePage(pageId: string, data: any): Promise<any> {
    return this.api.patch(this.config.config.routes.pagePageUpdate.replace('{id}', pageId), data);
  }

  createPageVersion(pageId: string, data: any): Promise<any> {
    return this.api.post(this.config.config.routes.pageVersionCreate.replace('{pageId}', pageId), data);
  }

  pageDelete(pageId: string): Promise<any> {
    return this.api.delete(this.config.config.routes.pageDelete.replace('{id}', pageId));
  }

  pageAvailablePageTypes(parentSitemapId: string): Promise<any> {
    return this.api.get(this.config.config.routes.pageAvailablePageTypes.replace('[/{parentSitemapId}]', '/' + parentSitemapId));
  }

  pageCreate(name: string, pageType: string, locale: string, parentSitemapId: string): Promise<string> {
    return this.api.post(this.config.config.routes.pageCreate, {name, pageType, locale, parentSitemapId});
  }

  pageAdd(name: string, locale: string, sitemapId: string): Promise<string> {
    return this.api.post(this.config.config.routes.pageAdd, {name, locale, sitemapId});
  }

  /* RESOURCE */

  clearResourceSelect(resource: string) {
    if (this.savedResourceSelects[resource]) {
      delete this.savedResourceSelects[resource];
    }
  }

  getResourceSelect(resource: string): Promise<Array<any>> {
    if (!this.savedResourceSelects[resource]) {
      this.savedResourceSelects[resource] = this.getResourceIndex(resource, 500);
    }
    return this.savedResourceSelects[resource].then((response) => {
      return response.items;
    });
  }

  getResourceIndex(resource: string, limit: number = 10, pageNumber: number = 1, search: string = null): Promise<ResourceList> {
    const params: any = {
      offset: (pageNumber - 1) * limit,
      limit: limit,
    };
    if (search && search !== '') {
      params.search = search;
    }
    return this.api.get(this.config.config.routes.resourceIndex.replace('{resource}', resource) + '?' + parseParams(params));
  }

  getResourceDetail(resource: string, id: string): Promise<Resource> {
    return this.api.get(this.config.config.routes.resourceDetail.replace('{resource}', resource).replace('{id}', id));
  }

  createResourceDetail(resource: string): Promise<Resource> {
    return this.api.get(this.config.config.routes.resourceCreateDetail.replace('{resource}', resource));
  }

  createResource(resource: string, data: any): Promise<{ id: string }> {
    return this.api.post(this.config.config.routes.resourceCreate.replace('{resource}', resource), data).then((response) => {
      this.clearResourceSelect(resource);
      return response;
    });
  }

  updateResource(resource: string, id: string, data: any): Promise<void> {
    return this.api.patch(this.config.config.routes.resourceUpdate.replace('{resource}', resource).replace('{id}', id), data).then((response) => {
      this.clearResourceSelect(resource);
      return response;
    });
  }

  deleteResource(resource: string, id: string): Promise<void> {
    return this.api.delete(this.config.config.routes.resourceDelete.replace('{resource}', resource).replace('{id}', id));
  }

  getMediaDetail(id: string): Promise<void> {
    return this.api.get(this.config.config.routes.mediaDetail.replace('{id}', id));
  }

}
