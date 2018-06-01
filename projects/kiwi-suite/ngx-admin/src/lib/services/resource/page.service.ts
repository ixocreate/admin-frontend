import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {ResourceService} from './resource.service';

@Injectable()
export class PageService extends ResourceService {
    protected resource = 'page';

    protected _createSchema: any;
    protected _createSchema$ = new BehaviorSubject<any>(null);

    protected _pageTypeSchema: any;
    protected _pageTypeSchema$ = new BehaviorSubject<any>(null);

    get sortLink() {
        return this.config.params.routes['pageSort'];
    }

    get pageVersionDetailLink() {
        if (!this._model) {
            console.warn('No model to generate version detail link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes['pageVersionDetail'];
        if (!url) {
            console.warn('No version detail route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    getCreateSchemaLink(parentSitemapId: string = null) {
        const url = this.config.params.routes['pageCreateSchema'];
        if (parentSitemapId === null) {
            return url.replace('[/{parentSitemapId}]', "");
        }

        return url.replace('[/{parentSitemapId}]', "/" + parentSitemapId);
    }

    get updateContentLink() {

        if (!this._model) {
            console.warn('No model to generate resource link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes['pageCreateVersion'];
        if (!url) {
            console.warn('No route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    get pageTypeSchemaLink() {
        if (!this._model) {
            console.warn('No model to generate resource link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes['pagePageTypeSchema'];
        if (!url) {
            console.warn('No route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    get createSchema$() {
        return this._createSchema$.asObservable();
    }

    get pageTypeSchema$() {
        return this._pageTypeSchema$.asObservable();
    }

    saveSort(data: any) {
        return this.api.post(this.sortLink, data);
    }

    loadCreateSchema(parentSitemapId: string = null) {
        this.config.ready$.subscribe(() => {
            this._loading$.next(true);
            this.api.get<any[]>(this.getCreateSchemaLink(parentSitemapId))
                .subscribe(
                    schema => {
                        this._createSchema = schema;
                        this._createSchema$.next(this._createSchema);
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    }
                );
        });
    }

    loadPageTypeSchema() {
        this.config.ready$.subscribe(() => {
            if (!this.pageTypeSchemaLink) {
                console.warn('No page type schema link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);
            this.api.get<any[]>(this.pageTypeSchemaLink)
                .subscribe(
                    schema => {
                        this._pageTypeSchema = schema;
                        this._pageTypeSchema$.next(this._pageTypeSchema);
                        console.log(this._pageTypeSchema)
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    }
                );
        });

        return this.pageTypeSchema$;
    }

    updateContent(model: any, values) {
        return this.api.post(this.updateContentLink, {content: values});
    }

    content(id: number | string) {
        return this.api.get(this.pageVersionDetailLink);
    }
}
