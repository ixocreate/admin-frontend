import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/internal/observable/of';
import {filter, map, takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {DataStoreService} from '../../services';


@Component({
    selector: 'app-breadcrumbs',
    template: `
        <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs$ | async" let-last=last>
            <li class="breadcrumb-item"
                *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last"
                [ngClass]="{active: last}">
                <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title | async}}</a>
                <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title | async}}</span>
            </li>
        </ng-template>`
})
export class AppBreadcrumbsComponent implements OnDestroy {
    breadcrumbs: Array<Object>;
    breadcrumbs$ = new BehaviorSubject<Array<Object>>([]);
    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private router: Router,
                private route: ActivatedRoute,
                private dataStore: DataStoreService) {
        this.router.events.pipe(
            takeUntil(this._destroyed$),
            filter(event => event instanceof NavigationEnd)
        ).subscribe(
            (event) => {
                this.breadcrumbs = [];
                let currentRoute = this.route.root;
                let url = '';
                do {
                    const childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    // tslint:disable-next-line:no-shadowed-variable
                    childrenRoutes.forEach(route => {
                        if (route.outlet === 'primary') {
                            const routeSnapshot = route.snapshot;
                            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                            if (route.snapshot.data.title) {
                                let title$ = of(route.snapshot.data.title);
                                if (route.snapshot.params.type) {
                                    title$ = this.dataStore.resource(route.snapshot.params.type).schema$.pipe(
                                        takeUntil(this._destroyed$),
                                        map(schema => {
                                            let title = route.snapshot.data.title;
                                            if (schema.namePlural) {
                                                title = title.replace('%resources', schema.namePlural);
                                            }
                                            if (schema.name) {
                                                title = title.replace('%resource', schema.name);
                                            }
                                            return title;
                                        })
                                    );
                                }
                                this.breadcrumbs.push({
                                    label: {title: title$},
                                    url: url
                                });
                                this.breadcrumbs$.next(this.breadcrumbs);
                            }
                            currentRoute = route;
                        }
                    });
                } while (currentRoute);
            }
        );
    }

    ngOnDestroy(): void {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }
}
