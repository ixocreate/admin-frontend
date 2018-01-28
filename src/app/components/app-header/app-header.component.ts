import {Component} from '@angular/core';
import {UserService} from '../../../kiwi/services';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    constructor(public user: UserService) {
    }

    logout() {
        this.user.logout();
    }
}
