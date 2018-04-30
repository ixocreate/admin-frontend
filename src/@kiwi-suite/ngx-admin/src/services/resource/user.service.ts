import {Injectable} from '@angular/core';
import {User} from '../../models';
import {ResourceService} from './resource.service';

@Injectable()
export class UserService extends ResourceService {

    protected resource = 'user';

    updateAvatar(model: User, values) {
        // TODO
        console.log(this.detailLink + '/avatar', model);
    }

    updateEmail(model: User, values) {
        return this.api.patch(this.config.params.routes['userEmail'].replace('{id}', model.id), values);
    }
}
