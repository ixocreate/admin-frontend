import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {ResourceService} from './resource.service';
import {SchemaTransformService} from "../schema-transform.service";

@Injectable()
export class PageService extends ResourceService {
    protected resource = 'page';

    protected _createSchema: any;
    protected _createSchema$ = new BehaviorSubject<any>(null);

    protected _contentSchema: any;
    protected _contentSchema$ = new BehaviorSubject<any>(null);

    protected _navigationSchema: any;
    protected _navigationSchema$ = new BehaviorSubject<any>(null);
    protected _navigation: any;
    protected _navigation$ = new BehaviorSubject<any>(null);

    get sortLink() {
        return this.config.params.routes['pageSort'];
    }

    saveSort(data: any) {
        return this.api.post(this.sortLink, data);
    }

    // == content create

    get createSchema$() {
        return this._createSchema$.asObservable();
    }

    createSchemaLink(parentSitemapId: string = null) {
        const url = this.config.params.routes['pageCreateSchema'];
        if (parentSitemapId === null) {
            return url.replace('[/{parentSitemapId}]', '');
        }

        return url.replace('[/{parentSitemapId}]', '/' + parentSitemapId);
    }

    loadCreateSchema(parentSitemapId: string = null) {
        this.config.ready$.subscribe(() => {
            this._loading$.next(true);
            this.api.get<any[]>(this.createSchemaLink(parentSitemapId))
                .subscribe(
                    schema => {
                        this._createSchema = (new SchemaTransformService()).transformForm(schema);
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

    // == content update

    get contentSchema$() {
        return this._contentSchema$.asObservable();
    }

    get contentDetailLink() {
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

    get contentSchemaLink() {
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

    get contentUpdateLink() {

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

    loadContentSchema() {
        this.config.ready$.subscribe(() => {
            if (!this.contentSchemaLink) {
                console.warn('No content schema link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);
            this.api.get<any[]>(this.contentSchemaLink)
                .subscribe(
                    schema => {
                        this._contentSchema = (new SchemaTransformService()).transformForm(schema);
                        this._contentSchema$.next(this._contentSchema);
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    }
                );
        });

        return this.contentSchema$;
    }

    content() {
        return this.api.get(this.contentDetailLink);
    }

    updateContent(model: any, values) {
        return this.api.post(this.contentUpdateLink, {content: values});
    }

    // == navigation

    get navigationIndexLink() {
        if (!this._model) {
            console.warn('No model to generate navigation index link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes['pageNavigationIndex'];
        if (!url) {
            console.warn('No navigation index route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    get navigationUpdateLink() {
        if (!this._model) {
            console.warn('No model to generate navigation update link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes['pageNavigationSave'];
        if (!url) {
            console.warn('No navigation update route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    get navigation$() {
        return this._navigation$.asObservable();
    }

    get navigationSchema$() {
        return this._navigationSchema$.asObservable();
    }

    loadNavigationSchema() {
        this._navigationSchema = [
            {
                wrappers: ['section'],
                templateOptions: {
                    label: 'Navigation',
                    icon: 'fa fa-fw fa-compass',
                },
                fieldGroup: [
                    {
                        key: 'navigation',
                        type: 'select',
                        templateOptions: {
                            multiple: true,
                            label: '',
                            valueProp: 'name',
                            options: this._navigation,
                        },
                    }
                ],
            },
        ];
        this._navigationSchema$.next(this._navigationSchema);
        return this.navigationSchema$;
    }

    navigation() {
        this.api.get(this.navigationIndexLink).subscribe(navigation => {
            this._navigation = navigation;
            this._navigation$.next(this._navigation);
        });
        return this.navigation$;
    }

    updateNavigation(model: any, values) {
        console.log(values);
        return this.api.post(this.navigationUpdateLink, values.navigation);
    }
}
