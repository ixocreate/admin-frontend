import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/observable';
import { CropperPosition } from '../../components/ixo-image-cropper/ixo-image-cropper.component';
import { DefaultHelper } from '../../helpers/default.helper';
import { Config } from '../../interfaces/config.interface';
import { Page } from '../../interfaces/page.interface';
import { ResourceList } from '../../interfaces/resource-list.interface';
import { Resource } from '../../interfaces/resource.interface';
import { parseParams } from '../../shared/parseParams';
import { AppState } from '../../store/app.state';
import { DefaultStore } from '../../store/default.store';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';
import { DataServiceAbstract } from './data.service.abstract';

@Injectable({
  providedIn: 'root'
})
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
      this.saveToDefaultStore('CONFIG', Object.assign({}, DefaultHelper.windowVar('__ixo'), data));
    });
  }

  getByUrl(url, params: { id?: string, term?: string, locale?: string }): Promise<any> {
    return this.api.get(url, params);
  }

  getSitemap(locale: string, pageType?: string): Promise<any> {
    return this.api.get(this.config.config.routes.pageList, {locale, pageType});
  }

  getSitemapIndex(): Promise<{ allowedAddingRoot: boolean, items: Page[] }> {
    return this.api.get(this.config.config.routes.sitemapIndex);
  }

  getSubPageIndex(handle: string): Promise<{ allowedAddingRoot: boolean, items: Page[] }> {
    return this.api.get(this.config.config.routes.pageIndexSub.replace('{handle}', handle));
  }

  getFlatPageIndex(handle: string, params: any = {}): Promise<{ allowedAddingRoot: boolean, items: Page[] }> {
    return this.api.get(this.config.config.routes.pageIndexFlat.replace('{handle}', handle) + '?' + parseParams(params));
  }

  getSitemapPages(sitemapId: string): Promise<any[]> {
    return this.api.get(this.config.config.routes.sitemapListPages.replace('{id}', sitemapId));
  }

  postSitemapMove(sitemapId: string, prevSiblingSitemapId: string, parentSitemapId: string): Promise<any> {
    return this.api.post(this.config.config.routes.sitemapMove, {
      id: sitemapId,
      prevSiblingId: prevSiblingSitemapId,
      parentId: parentSitemapId,
    });
  }

  postSitemapCopy(sitemapId: string, prevSiblingSitemapId: string, parentSitemapId: string, locales = null): Promise<any> {
    return this.api.post(this.config.config.routes.sitemapCopy, {
      fromSitemapId: sitemapId,
      prevSiblingId: prevSiblingSitemapId,
      parentId: parentSitemapId,
      locales,
    });
  }

  postPageCopyToSitemapId(fromPageId: string, toSitemapId: string = null, toLocale: string = null, name: string = null): Promise<any> {
    return this.api.post(this.config.config.routes.pageCopy, {
      fromPageId,
      toSitemapId,
      toLocale,
      name,
    });
  }

  postPageCopyToPageId(fromPageId: string, toPageId = null): Promise<any> {
    return this.api.post(this.config.config.routes.pageCopy, {
      fromPageId,
      toPageId,
    });
  }

  /**
   * Get general data about a page, like its schema, localizedPages, navigation, page, pageType, sitemap
   *
   * @param pageId UUID of the page to load
   */
  getPageDetail(pageId: string): Promise<any> {
    return this.api.get(this.config.config.routes.pageDetail.replace('{id}', pageId));
  }

  /**
   * Get the specific content of a page and its version, the backend decides how the structure looks like, this is why we have <any> here
   *
   * @param pageId UUID of the page to get
   * @param pageVersionId UUID of its content version to get
   */
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
    return this.api.post(this.config.config.routes.pageVersionCreate.replace('{id}', pageId), data);
  }

  pageDelete(pageId: string): Promise<any> {
    return this.api.delete(this.config.config.routes.pageDelete.replace('{id}', pageId));
  }

  pageAvailablePageTypes(parentSitemapId: string): Promise<any> {
    let url = this.config.config.routes.pageAvailablePageTypes;
    if (parentSitemapId) {
      url = url.replace('[/{parentSitemapId}]', '/' + parentSitemapId);
    } else {
      url = url.replace('[/{parentSitemapId}]', '');
    }
    return this.api.get(url);
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

  getResourceSelect(resource: string, search: string = null, params = {}): Promise<any[]> {
    /**
     * Note: the limit not applies to search results, not preselected items which will always be prepended
     */
    return this.getResourceIndex(resource, 100, 1, search, params).then((response) => {
      return response.items;
    });
  }

  getResourceIndex(resource: string, limit: number = 10, pageNumber: number = 1, search: string = null, params: any = {}): Promise<ResourceList> {
    params.offset = (pageNumber - 1) * limit;
    params.limit = limit;
    if (search && search !== '') {
      params.search = search;
    }
    return this.api.get(this.config.config.routes.resourceIndex.replace('{resource}', resource) + '?' + parseParams(params));
  }

  getResourceDetail(resource: string, id: string): Promise<Resource> {
    return this.api.get(this.config.config.routes.resourceDetail.replace('{resource}', resource).replace('{id}', id));
  }

  getResourceDefaultValue(resource: string): Promise<Resource> {
    return this.api.get(this.config.config.routes.resourceDefaultValue.replace('{resource}', resource));
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

  getMediaIndex(limit: number = 10, pageNumber: number = 1, search: string = null, type: string = null): Promise<ResourceList> {
    const params: any = {
      offset: (pageNumber - 1) * limit,
      limit,
    };
    if (search && search !== '') {
      params.filter = {};
      params.filter.filename = search;
    }
    if (type && type !== '') {
      params.type = type;
    }

    return this.api.get(this.config.config.routes.mediaIndex + '?' + parseParams(params));
  }

  getMediaDetail(id: string): Promise<void> {
    return this.api.get(this.config.config.routes.mediaDetail.replace('{id}', id));
  }

  mediaEditor(id: string, imageDefinition: string, crop: CropperPosition): Promise<void> {
    return this.api.post(this.config.config.routes.mediaEditor, {id, imageDefinition, crop});
  }

  mediaDelete(id: string): Promise<void> {
    return this.api.delete(this.config.config.routes.mediaDelete.replace('{id}', id));
  }

  getUserConfig(): Promise<ResourceList> {
    return this.api.get(this.config.config.routes.userConfig);
  }

  createUser(data: any): Promise<{ id: string }> {
    return this.api.post(this.config.config.routes.userCreate, data).then((response) => {
      return response;
    });
  }

  getUserDetail(id: string): Promise<Resource> {
    return this.api.get(this.config.config.routes.userDetail.replace('{id}', id));
  }

  deleteUser(id: string): Promise<void> {
    return this.api.delete(this.config.config.routes.userDelete.replace('{id}', id));
  }

  updateUser(id: string, data: any): Promise<void> {
    return this.api.patch(this.config.config.routes.userUpdate.replace('{id}', id), data).then((response) => {
      return response;
    });
  }

  getRegistryDetail(id: string): Promise<any> {
    return this.api.get(this.config.config.routes.registryDetail.replace('{id}', id));
  }

  updateRegistry(id: string, data: any): Promise<void> {
    return this.api.patch(this.config.config.routes.registryUpdate.replace('{id}', id), data).then((response) => {
      return response;
    });
  }

  getDashboard(): Promise<any> {
    return this.api.get(this.config.config.routes.dashboardIndex);
  }

  getPageWidgets(position: string, id: string): Promise<any> {
    if (!this.config.config.routes.pageWidgets) {
      return Promise.resolve([]);
    }
    return this.api.get(this.config.config.routes.pageWidgets
      .replace('{position}', position)
      .replace('{id}', id)
    );
  }

  getResourceWidgets(resource: string, position: string, type: string, id: string = null): Promise<any> {
    if (!this.config.config.routes.resourceWidgets) {
      return Promise.resolve([]);
    }
    if (id === null) {
      return this.api.get(
        this.config.config.routes.resourceWidgets
          .replace('{resource}', resource).replace('{position}', position)
          .replace('{type}', type).replace('[/{id}]', ''),
      );
    }
    return this.api.get(this.config.config.routes.resourceWidgets.replace('{resource}', resource)
      .replace('{position}', position).replace('{type}', type).replace('[/{id}]', '/' + id));
  }
}
