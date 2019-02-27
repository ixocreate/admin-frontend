import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { filter } from 'rxjs/internal/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppDataService } from './data/app-data.service';
import { IxoBreadcrumbService } from '../components/ixo-breadcrumb/ixo-breadcrumb.service';

@Injectable()
export class PageTitleService {

  private projectName;
  private pageName = '-';

  constructor(private router: Router,
              private titleService: Title,
              private appData: AppDataService,
              private config: ConfigService,
              private breadcrumb: IxoBreadcrumbService,
              private activatedRoute: ActivatedRoute) {
  }

  setPageTitle(replaceData: Array<{ search: string, replace: string }> = [{search: '{resource}', replace: ''}]) {
    let name = this.pageName;
    for (const value of replaceData) {
      name = name.replace(value.search, value.replace);
    }
    if (this.projectName) {
      name += ' :: ' + this.projectName;
    }
    if (!this.config.environment.production) {
      name = '[dev] ' + name;
    }
    this.breadcrumb.updateBreadCrumbs(replaceData);
    this.titleService.setTitle(name);
  }

  init() {
    this.appData.config$.subscribe((appConfig) => {
      if (appConfig && appConfig.project) {
        this.projectName = appConfig.project.name;
        this.setPageTitle();
      }
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const urlElements = [];
      let currentRoute = this.activatedRoute.root;
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((route) => {
          if (route.outlet === 'primary') {
            const data = route.snapshot.data;
            if (data && data.title) {
              urlElements.push(data.title);
            }
            currentRoute = route;
          }
        });
      } while (currentRoute);
      urlElements.reverse();
      this.pageName = urlElements.join(' / ');
      this.setPageTitle();
      this.appData.clearSavedResourceSelects();
      window.scrollTo(0, 0);
    });
  }

}
