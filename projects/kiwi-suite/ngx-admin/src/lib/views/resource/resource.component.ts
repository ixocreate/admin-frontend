import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { ViewAbstractComponent } from '../../components/view.abstract.component';

@Component({
  templateUrl: './resource.component.html',
})
export class ResourceComponent extends ViewAbstractComponent implements OnInit {

  dataUrl = '';

  constructor(protected route: ActivatedRoute, private config: ConfigService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataUrl = this.config.appConfig.routes.resourceIndex.replace('{resource}', params.type);
    });
  }
}
