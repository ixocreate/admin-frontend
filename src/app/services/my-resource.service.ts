import {Injectable} from '@angular/core';
import {ResourceService} from '../../kiwi/services/resource.service';

@Injectable()
export class MyResourceService extends ResourceService {

    protected resource = 'my-resource';
}
