import {Injectable} from '@angular/core';
import {ResourceService} from '@kiwi-suite/ngx-admin';

@Injectable()
export class MyResourceService extends ResourceService {

    protected resource = 'my-resource';
}
