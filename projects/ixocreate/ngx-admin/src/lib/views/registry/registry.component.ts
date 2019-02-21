import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { ConfigService } from '../../services/config.service';

@Component({
  templateUrl: './registry.component.html',
})
export class RegistryComponent extends ViewAbstractComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected config: ConfigService) {
    super();
  }

  get apiUrl() {
    return this.config.config.routes['registryIndex'];
  }

  ngOnInit() {

  }
}
