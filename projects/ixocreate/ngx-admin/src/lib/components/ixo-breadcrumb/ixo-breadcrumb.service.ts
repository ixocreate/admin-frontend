import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class IxoBreadcrumbService {
  currentBreadcrumbs: any[];
  breadcrumbs: Observable<any[]>;
  private _breadcrumbs: BehaviorSubject<any[]>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this._breadcrumbs = new BehaviorSubject<any[]>([]);
    this.breadcrumbs = this._breadcrumbs.asObservable();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const breadcrumbs = [];
      let currentRoute = this.route.root;
      let url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((childRoute) => {
          if (childRoute.outlet === 'primary') {
            const routeSnapshot = childRoute.snapshot;
            const newUrl = routeSnapshot.url.map((segment) => segment.path).join('/');
            if (newUrl !== '') {
              url += '/' + routeSnapshot.url.map((segment) => segment.path).join('/');
            }
            if (childRoute.snapshot.data && childRoute.snapshot.data.title) {
              breadcrumbs.push({
                label: childRoute.snapshot.data,
                url: url || '/',
              });
            }
            currentRoute = childRoute;
          }
        });
      } while (currentRoute);
      this.currentBreadcrumbs = breadcrumbs;
      this.updateBreadCrumbs();
      return breadcrumbs;
    });
  }

  updateBreadCrumbs(replaceData: Array<{ search: string, replace: string }> = []) {
    if (!this.currentBreadcrumbs) {
      return;
    }
    const breadcrumbs = JSON.parse(JSON.stringify(this.currentBreadcrumbs));
    for (const breadcrumb of breadcrumbs) {
      for (const value of replaceData) {
        breadcrumb.label.title = breadcrumb.label.title.replace(value.search, value.replace);
      }
    }
    this._breadcrumbs.next(breadcrumbs);
  }
}
