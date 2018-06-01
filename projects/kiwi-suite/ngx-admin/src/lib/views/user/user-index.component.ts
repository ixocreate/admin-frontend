import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'user-index',
    templateUrl: './user-index.component.html',
})
export class UserIndexComponent extends ResourceIndexComponent {

    /**
     * not needed when dataService is injected in constructor
     */
    // protected type = 'user';

    constructor(protected dataService: UserService,
                protected route: ActivatedRoute) {
        super(route);
    }
}
