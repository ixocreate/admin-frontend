import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

@Injectable()
export class PageService extends ResourceService {

    protected resource = 'page';
}
