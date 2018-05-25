import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

@Injectable()
export class PageService extends ResourceService {
    protected resource = 'page';

  get sortLink() {
    return this.config.params.routes['pageSort'];
  }

  saveSort(data: any)
  {
    return this.api.post(this.sortLink, data);
  }
}
