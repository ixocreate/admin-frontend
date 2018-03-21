import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ResourceListComponent} from '../../../kiwi/components/resource/resource-list.component';
import {AccountService, UserService} from '../../../kiwi/services';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent extends ResourceListComponent implements OnInit {

    constructor(protected dataService: UserService,
                protected accountService: AccountService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected toastr: ToastrService) {
        super(dataService, accountService, route, router, toastr);
    }
}
