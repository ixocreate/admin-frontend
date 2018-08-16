import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

@Injectable()
export class TranslationService extends ResourceService {
    protected _pathPrefix = '';
    protected resource = 'translation';

    get catalogues$() {
        return this.api.get(this.config.params.routes['translationCatalogue']);
    }

    getCatalogueIndex$(catalogue: string, params: any = {}) {
        return this.api.get(this.config.params.routes['translationIndex'].replace("{catalogue}", catalogue), params);
    }

    getDetail$(catalogue: string, definitionId: string) {
        return this.api.get(this.config.params.routes['translationDetail'].replace("{catalogue}", catalogue).replace("{id}", definitionId));
    }

    save(data, definitionId: string) {
        data['definitionId'] = definitionId;
        return this.api.post(this.config.params.routes['translationSave'], data);
    }
}
