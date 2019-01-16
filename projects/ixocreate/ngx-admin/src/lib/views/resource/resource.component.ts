import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { PageTitleService } from '../../services/page-title.service';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  templateUrl: './resource.component.html',
})
export class ResourceComponent extends ViewAbstractComponent implements OnInit {

  resourceKey: string;
  canCreate = false;

  aboveWidgetData$: Promise<any>;
  belowWidgetData$: Promise<any>;

  filters: any = {};
  search = '';

  constructor(protected route: ActivatedRoute, protected config: ConfigService, protected pageTitle: PageTitleService, protected appData: AppDataService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceKey = params.type || this.resourceKey;
      this.pageTitle.setPageTitle([{search: '{resource}', replace: this.config.getResourceConfig(this.resourceKey).label}]);
      setTimeout(() => {
        this.canCreate = this.config.getResourceConfig(this.resourceKey).canCreate;
      });
      this.aboveWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'above', 'list');
      this.belowWidgetData$ = this.appData.getResourceWidgets(this.resourceKey, 'below', 'list');
    });

    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      for (let key of Object.keys(params)) {
        const value = params[key];
        if (key.indexOf('filter[') > -1) {
          key = key.replace('filter[', '').replace(']', '');
          this.filters[key] = value;
        }
        if (key === 'search') {
          this.search = value;
        }
      }
    });
  }

}
