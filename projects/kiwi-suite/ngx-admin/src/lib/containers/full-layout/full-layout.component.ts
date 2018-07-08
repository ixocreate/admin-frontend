import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AccountService, ConfigurationService} from '../../services';
import {ApiService} from "../../services/api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {compileNgcTransform} from "ng-packagr/lib/ng-v5/entry-point/ts/compile-ngc.transform";

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit{
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;

    public asideTemplate = {
        enabled: false,
        content: null,
    };

    public navigation = [];

    constructor(private account: AccountService,
                private router: Router,
                private api: ApiService,
                private config: ConfigurationService,
                private domSanitizer: DomSanitizer
    ) {

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
    }

    ngOnInit(): void {
        this.account.user$.subscribe(user => {
            this.config.params$.subscribe(config => {
                this.navigation = this.config.navigation;
            });
        });
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
                this.config.params$.subscribe(config => {
                    let url = null;
                    config.navigation.forEach((value) => {
                        if (url !== null) {
                            return;
                        }

                        if (value.children.length > 0) {
                            url = value.children[0].url;
                        }
                    });
                    if (url !== null) {
                        this.router.navigate([url]);
                    }

                });
            });
        }
    }
    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    get config$() {
        return this.config.params$;
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

    logout() {
        this.account.logout().subscribe(() => {
            window.location.reload();
        });
    }
}
