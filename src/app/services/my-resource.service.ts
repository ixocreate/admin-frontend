import {Injectable} from '@angular/core';
import {ResourceService} from '../../@kiwi-suite/ngx-admin/src/services/resource/resource.service';

@Injectable()
export class MyResourceService extends ResourceService {

    protected resource = 'my-resource';
}
