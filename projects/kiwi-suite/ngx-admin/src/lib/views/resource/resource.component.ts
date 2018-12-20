import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  templateUrl: './resource.component.html',
})
export class ResourceComponent extends ViewAbstractComponent implements OnInit {

  resourceKey: string;
  canCreate = false;

  constructor(protected route: ActivatedRoute, protected config: ConfigService, protected pageTitle: PageTitleService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resourceKey = params.type || this.resourceKey;
      this.pageTitle.setPageTitle([{search: '{resource}', replace: this.config.getResourceConfig(this.resourceKey).label}]);
      setTimeout(() => {
        this.canCreate = this.config.getResourceConfig(this.resourceKey).canCreate;
      });
    });
  }

}
