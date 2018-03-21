import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService, ApiService} from '../../../kiwi/services';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    constructor(private api: ApiService,
                private account: AccountService,
                private router: Router) {
    }

    get loading$() {
        return this.api.loading$;
    }

    get loadingAccount$() {
        return this.account.loading$;
    }

    get user$() {
        return this.account.user$;
    }

    sanitizeUrl(url) {
        return this.account.sanitizeUrl(url);
    }

    logout() {
        this.account.logout().subscribe(() => {
            this.router.navigate(['/auth/login'])
                .then(() => {
                    window.location.reload();
                });
        });
    }
}
