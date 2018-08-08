import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class PageService extends ResourceService {
    protected _pathPrefix = '';
    protected resource = 'page';

    protected _navigation$ = new BehaviorSubject<any>(null);

    get sortLink() {
        return this.config.params.routes['pageSort'];
    }

    get addLink() {
        return this.config.params.routes['pageAdd'];
    }

    loadNavigation(id) {
        let url = this.config.params.routes['pageNavigationIndex'];
        url = url.replace('{id}', id);
        this.api.get(url).subscribe(navigation => {
            this._navigation$.next(navigation);
        });
    }

    get navigation$() {

        return this._navigation$;
    }

    updateNavigation(id, values) {
        let url = this.config.params.routes['pageNavigationSave'];
        url = url.replace('{id}', id);
        return this.api.post(url, values.navigation);
    }

    saveSort(data: any) {
        return this.api.post(this.sortLink, data);
    }

    addPage(data: any) {
        return this.api.post(this.addLink, data);
    }

    replaceContent(fromId: string, toId: string)
    {
        let url = this.config.params.routes['pageVersionReplace'];
        url = url.replace('{fromId}', fromId).replace('{toId}', toId);
        return this.api.post(url);
    }
}
