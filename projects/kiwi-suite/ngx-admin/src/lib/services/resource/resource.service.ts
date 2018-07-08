import {Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from '../api.service';
import {ConfigurationService} from '../configuration.service';
import {DataService} from '../data.service';
import {SchemaTransformService} from "../schema-transform.service";
import {ResourceListModel, ResourceModel} from "../../models/api.model";

export class ResourceService extends DataService {

    protected resource: string;

    protected _listData$ = new BehaviorSubject<ResourceListModel>(null);
    protected _createData$ = new BehaviorSubject<ResourceModel>(null);
    protected _updateData$ = new BehaviorSubject<ResourceModel>(null);

    protected _loading$ = new BehaviorSubject<boolean>(false);

    protected _pathPrefix = 'resource/';

    constructor(@Inject(ApiService) protected api: ApiService,
                @Inject(ConfigurationService) protected config: ConfigurationService) {
        super(api);
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

    get listData$() {
        return this._listData$.asObservable();
    }

    get createData$() {
        return this._createData$.asObservable();
    }

    get updateData$() {
        return this._updateData$.asObservable();
    }

    get pathPrefix() {
        return this._pathPrefix;
    }

    get indexLink() {
        return this.config.params.routes['resourceIndex'].replace('{resource}', this.resourceKey);
    }

    get createIndexLink() {
        return this.config.params.routes['resourceCreateDetail'].replace('{resource}', this.resourceKey);
    }

    get updateIndexLink() {
        return this.config.params.routes['resourceDetail'].replace('{resource}', this.resourceKey);
    }

    get createLink() {
        return this.config.params.routes['resourceCreate'].replace('{resource}', this.resourceKey);
    }

    get updateLink() {
        return this.config.params.routes['resourceUpdate'].replace('{resource}', this.resourceKey);
    }

    get deleteLink() {
        return this.config.params.routes['resourceDelete'].replace('{resource}', this.resourceKey);
    }

    loadListData(params: any = {}, linkModifier: (url: string) => string = null) {
        this._listData$.next(null);
        this.config.ready$.subscribe(res => {
            let link = this.indexLink;
            if (linkModifier !== null) {
                link = linkModifier(link);
            }

            this._loading$.next(true);

            this.api.get<ResourceListModel>(link, params)
                .subscribe(
                    (data: ResourceListModel) => {
                        this._listData$.next(data);
                        return data;
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    },
                );
        });
    }

    loadCreateData(params: any = {}, linkModifier: (url: string) => string = null) {
        this._createData$.next(null);
        this.config.ready$.subscribe(res => {
            let link = this.createIndexLink;
            if (linkModifier !== null) {
                link = linkModifier(link);
            }

            this._loading$.next(true);

            this.api.get<ResourceModel>(link, params)
                .subscribe(
                    (data: ResourceModel) => {
                        const schemaTransformService = new SchemaTransformService();
                        data.schema = schemaTransformService.transformForm(data.schema);

                        this._createData$.next(data);
                        return data;
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    },
                );
        });
    }

    loadUpdateData(id: string, params: any = {}, linkModifier: (url: string) => string = null) {
        this._updateData$.next(null);
        this.config.ready$.subscribe(res => {
            let link = this.updateIndexLink;
            link = link.replace('{id}', id);
            if (linkModifier !== null) {
                link = linkModifier(link);

            }

            this._loading$.next(true);

            this.api.get<ResourceModel>(link, params)
                .subscribe(
                    (data: ResourceModel) => {
                        const schemaTransformService = new SchemaTransformService();
                        data.schema = schemaTransformService.transformForm(data.schema);

                        this._updateData$.next(data);
                        return data;
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    },
                );
        });
    }

    create(values, linkModifier: (url: string) => string = null) {
        let link = this.createLink;
        if (linkModifier !== null) {
            link = linkModifier(link);
        }

        return this.api.post(link, values);
    }

    update(model: any, values, linkModifier: (url: string) => string = null) {
        let link = this.updateLink;
        link = link.replace('{id}', model.id);
        if (linkModifier !== null) {
            link = linkModifier(link);
        }

        return this.api.patch(link, values);
    }

    delete(model: any, linkModifier: (url: string) => string = null) {
        let link = this.deleteLink;
        link = link.replace('{id}', model.id);
        if (linkModifier !== null) {
            link = linkModifier(link);
        }

        return this.api.delete(link);
    }
}
