import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services';
import {ResourceListComponent} from '../resource';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent extends ResourceListComponent {

    /**
     * not needed when dataService is injected in constructor
     */
    // protected type = 'user';

    constructor(protected dataService: UserService,
                protected route: ActivatedRoute) {
        super(route);
    }
}
