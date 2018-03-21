import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AccountService} from '../../../kiwi/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
    constructor(private account: AccountService,
                private router: Router) {
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
                // TODO: redirect to account default page
                this.router.navigate(['contact']);
            });
        }
    }
}
