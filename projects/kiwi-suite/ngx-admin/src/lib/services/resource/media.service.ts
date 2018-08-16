import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

@Injectable()
export class MediaService extends ResourceService {
    protected resource = 'media';

    get uploadLink() {
        return this.config.params.routes['mediaUpload'];
    }
}
