import {Inject} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ApiService} from '../api.service';
import {ConfigurationService} from '../configuration.service';
import {DataService} from '../data.service';

export class ResourceService extends DataService {

    protected resource: string;

    protected _subscription: Subscription;

    protected _schema: any;
    protected _schema$ = new BehaviorSubject<any>({});
    protected _model$ = new BehaviorSubject<any>({});
    protected _model: any;
    protected _models$ = new BehaviorSubject<any[]>([]);
    protected _models: any[];

    protected _loading$ = new BehaviorSubject<boolean>(false);

    // /**
    //  * create a new instance (not a shared instance) of ResourceService
    //  * @type {Injector}
    //  */
    // static create(resourceKey: string) {
    //     const logger = AppInjector.get(LoggerService);
    //     /**
    //      * https://blog.angularindepth.com/angular-introduces-staticinjector-should-you-care-4e059eca030c
    //      * TODO: https://github.com/angular/angular/issues/18946
    //      */
    //     // const staticInjector = AppInjector.create({
    //     //     providers: [
    //     //         {
    //     //             provide: ResourceService,
    //     //             useClass: ResourceService,
    //     //             deps: [ApiService, ConfigurationService, DomSanitizer]
    //     //         },
    //     //     ],
    //     //     // AppInjector
    //     // });
    //     const staticInjector = ReflectiveInjector.resolveAndCreate([ResourceService]);
    //
    //     const resourceProvider = staticInjector.get(ResourceService);
    //     resourceProvider.resourceKey = resourceKey;
    //
    //     logger.log('created dynamic resource provider ' + resourceKey);
    //     return resourceProvider;
    // }

    constructor(@Inject(ApiService) protected api: ApiService,
                @Inject(ConfigurationService) protected config: ConfigurationService) {
        super(api);
    }

    /**
     * subscribe like this in resource components:
     *
     * this.dataservice.model$.takeUntil(this.unsubscribeOnDestory)
     */
    get model$() {
        return this._model$.asObservable();
    }

    /**
     * subscribe like this in resource components:
     *
     * this.dataservice.model$.takeUntil(this.unsubscribeOnDestory)
     */
    get models$() {
        // if (!this._subscription) {
        //     console.log('load models!');
        //     this.loadModels();
        // }
        return this._models$.asObservable();
    }

    get schema$() {
        return this._schema$.asObservable();
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

    get schemaLink() {
        return this.config.params.routes[this.resource + 'Schema'];
    }

    get resourceKey() {
        return this.resource;
    }

    set resourceKey(resourceKey: string) {
        this.resource = resourceKey;
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    /**
     * generic resources loader
     */
    protected loadModels(params: any = {}) {
        this.config.ready$.subscribe(res => {
            if (!this.indexLink) {
                console.warn('No index link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);

            // if (this._subscription) {
            //     this._subscription.unsubscribe();
            // }

            this._subscription = this.api.get<any[]>(this.indexLink, params)
                .subscribe(
                    models => {
                        this._models = models;
                        this._models$.next([...this._models]);
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

    protected loadModel(id: number | string) {

        this._model = {id: id};

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

    protected loadSchema() {
        this.config.ready$.subscribe(() => {
            if (!this.schemaLink) {
                console.warn('No schema link for resource [' + this.resource + ']');
                return;
            }
            this._loading$.next(true);
            this.api.get<any[]>(this.schemaLink)
                .subscribe(
                    schema => {
                        this._schema = schema;
                        this._schema$.next(this._schema);
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
        this.loadSchema();
        if (id) {
            this.loadModel(id);
        } else {
            this.loadModels();
        }
    }

    /**
     * alias for load()
     */
    reload() {
        this.load();
    }

    /**
     * @param id
     */
    find(id: number | string) {

        if (!this._subscription) {
            this.load();
        }

        this._model$.next(null);

        /**
         * get model from loaded models right away
         */
        // this._models$.subscribe(
        //     models => {
        //         if (!models || !models.length) {
        //             return;
        //         }
        //         const model = models.find(modelEntry => modelEntry.id === id);
        //         if (model) {
        //             this._model = model;
        //             this._model$.next(model);
        //         }
        //     }
        // );

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
}
