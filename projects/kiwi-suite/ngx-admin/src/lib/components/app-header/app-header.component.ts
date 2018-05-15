import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AccountService, ApiService, ConfigurationService} from '../../services';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    constructor(private api: ApiService,
                private config: ConfigurationService,
                private account: AccountService,
                private router: Router,
                private domSanitizer: DomSanitizer) {
    }

    get config$() {
        return this.config.params$.pipe(map(config => config.project));
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
        return this.domSanitizer.bypassSecurityTrustUrl(url);
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
