import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { filter } from 'rxjs/operators';

@Injectable()
export class KiwiBreadcrumbService {
  breadcrumbs: Observable<Array<Object>>;
  private _breadcrumbs: BehaviorSubject<Array<Object>>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this._breadcrumbs = new BehaviorSubject<Object[]>([]);
    this.breadcrumbs = this._breadcrumbs.asObservable();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      const breadcrumbs = [];
      let currentRoute = this.route.root;
      let url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((childRoute) => {
          if (childRoute.outlet === 'primary') {
            const routeSnapshot = childRoute.snapshot;
            const newUrl = routeSnapshot.url.map(segment => segment.path).join('/');
            if (newUrl !== '') {
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
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
      this._breadcrumbs.next(Object.assign([], breadcrumbs));
      return breadcrumbs;
    });
  }
}
