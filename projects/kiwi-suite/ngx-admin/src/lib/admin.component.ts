import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators';
import { AppDataService } from './services/data/app-data.service';
import { ConfigService } from './services/config.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AdminComponent implements OnInit {

  private projectName;
  private pageName = '-';

  constructor(private router: Router,
              private titleService: Title,
              private appData: AppDataService,
              private config: ConfigService,
              private activatedRoute: ActivatedRoute) {
    this.appData.config$.subscribe((appConfig) => {
      this.projectName = appConfig.project.name;
      this.setPageTitle();
    });
  }

  setPageTitle() {
    let name = this.pageName;
    if (this.projectName) {
      name += ' :: ' + this.projectName;
    }
    if (!this.config.environment.production) {
      name = '[dev] ' + name;
    }
    this.titleService.setTitle(name);
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      const urlElements = [];
      let currentRoute = this.activatedRoute.root;
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(route => {
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
      window.scrollTo(0, 0);
    });
  }
}
