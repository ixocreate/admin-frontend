import { Component } from '@angular/core';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import {AppDataService} from "../../services/data/app-data.service";

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends ViewAbstractComponent {
  data$: Promise<any>;

  constructor(private appData: AppDataService) {
    super();
  }

  ngOnInit() {
    this.data$ = this.appData.getDashboard().then((response: any) => {
      return response;
    });
  }
}
