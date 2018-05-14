import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services';
import {ResourceListComponent} from '../resource/resource-list.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent extends ResourceListComponent implements OnInit {

    protected _resourceKey = 'user';

    constructor(protected dataService: UserService,
                protected route: ActivatedRoute) {
        super(route);
    }
}
