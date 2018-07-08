import {ResourceService} from './resource.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService extends ResourceService {

    protected _pathPrefix = '';
    protected resource = 'admin-user';

    //
    // updateEmail(model: User, values) {
    //     return this.api.patch(this.config.params.routes['userEmail'].replace('{id}', model.id), values);
    // }
}
