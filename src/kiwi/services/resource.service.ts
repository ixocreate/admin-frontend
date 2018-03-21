import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from './api.service';
import {DataService} from './data.service';
import {ConfigurationService} from './index';

export abstract class ResourceService extends DataService {

    protected resource: string;

    protected _subscription: Subscription;

    protected _model$ = new BehaviorSubject<any>({});
    protected _model: any;
    protected _models$ = new BehaviorSubject<any[]>([]);
    protected _models: any[];

    protected _loading$ = new BehaviorSubject<boolean>(false);

    constructor(protected api: ApiService,
                protected config: ConfigurationService,
                protected domSanitizer: DomSanitizer) {
        super(api);
    }

    get model$() {
        return this._model$.asObservable();
    }

    get models$() {
        return this._models$.asObservable();
    }

    get indexLink() {
        return this.config.params.routes[this.resource + 'Index'];
    }

    get createLink() {
        return this.config.params.routes[this.resource + 'Create'];
    }

    get detailLink() {
        if (!this._model) {
            console.warn('No model to generate resource link with [' + this.resource + ']');
            return '';
        }
        const url = this.config.params.routes[this.resource + 'Update'];
        if (!url) {
            console.warn('No route configuration for model [' + this.resource + ']');
            return '';
        }
        return url.replace('{id}', this._model.id);
    }

    get updateLink() {
        return this.detailLink;
    }

    get deleteLink() {
        return this.detailLink;
    }

    get resourceKey() {
        return this.resource;
    }

    get resourceName() {
        return this.resource.charAt(0).toUpperCase() + this.resource.substr(1);
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    /**
     * generic resources loader
     */
    protected loadModels(params: any = {}) {
        this.config.ready$.subscribe(() => {
            if (!this.indexLink) {
                console.warn('No index link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);
            this._subscription = this.api.get<any[]>(this.indexLink, params)
                .subscribe(
                    models => {
                        this._models = models;
                        this._models$.next(this._models);
                        return this._models;
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    },
                );
        });
    }

    /**
     * generic resource loaded
     * @param {number | string} id
     */
    protected loadModel(id: number | string) {
        this.config.ready$.subscribe(() => {
            if (!this.detailLink) {
                console.warn('No detail link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);
            this.api.get<any[]>(this.detailLink)
                .subscribe(
                    model => {
                        this._model = model;
                        this._model$.next(this._model);
                        return this._model;
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    }
                );
        });
    }

    all(params: any = {}) {
        this.loadModels(params);
    }

    load(id?: number | string) {
        if (id) {
            this.loadModel(id);
        } else {
            this.loadModels();
        }
    }

    /**
     * @param id
     */
    find(id: number | string) {

        this._model$.next(null);

        if (!this._subscription) {
            this.load();
        }

        /**
         * get model from loaded models right away
         */
        this._models$.subscribe(models => {
            if (!models || !models.length) {
                return;
            }
            const model = models.find(modelEntry => modelEntry.id === id);
            if (model) {
                this._model = model;
                this._model$.next(model);
            }
        });

        /**
         * fetch full model
         */
        this.loadModel(id);

        return this.model$;
    }

    create(model: any, values) {
        return this.api.post(this.createLink, values);
    }

    update(model: any, values) {
        return this.api.patch(this.updateLink, values);
    }

    delete(model: any) {
        return this.api.delete(this.deleteLink);
    }

    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
