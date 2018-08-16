import {Component} from '@angular/core';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'user-index',
    templateUrl: './user-index.component.html',
})
export class UserIndexComponent extends ResourceIndexComponent {
    protected type = 'admin-user';

    ngOnInit() {
        this.initDataService(this.type);
    }
}
