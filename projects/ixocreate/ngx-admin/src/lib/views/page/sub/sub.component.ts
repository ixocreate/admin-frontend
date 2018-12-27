import { Component } from '@angular/core';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../../../services/data/app-data.service';

@Component({
  templateUrl: './sub.component.html',
})
export class SubComponent extends ViewAbstractComponent {

  handle: string;

  items = () => {
    return this.appData.getSubPageIndex(this.handle);
  }

  constructor(
    protected route: ActivatedRoute,
    protected appData: AppDataService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.handle = params.handle;
    });
  }
}
