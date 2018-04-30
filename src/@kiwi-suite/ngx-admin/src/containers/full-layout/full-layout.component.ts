import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AccountService, ConfigurationService} from '../../services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
    constructor(private account: AccountService,
                private router: Router,
                private config: ConfigurationService) {
    }

    ngOnInit(): void {
        /**
         * if in root -> redirect to default uri or preferred account uri
         */
        this.rootRedirect();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.rootRedirect();
            }
        });
    }

    private rootRedirect() {
        if (this.router.isActive('', true)) {
            this.account.user$.subscribe(user => {
                /**
                 * redirect to first navigation item in config default page
                 * TODO: or account default page
                 * TODO: prevent infinite redirects because first nav item to be displayed is not accessible by user
                 */
                // this.router.navigate([this.config.navigation[0].url]);
            });
        }
    }
}
