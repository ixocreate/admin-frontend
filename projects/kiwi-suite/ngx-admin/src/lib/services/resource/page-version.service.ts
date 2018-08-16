import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

@Injectable()
export class PageVersionService extends ResourceService {
    protected _pathPrefix = '';
    protected resource = 'page-version';
}
