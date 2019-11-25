import { Injectable } from '@angular/core';
import { IxoDashboardCounterComponent } from '../dashboard/ixo-dashboard-counter/ixo-dashboard-counter.component';
import { IxoDashboardSlideshowComponent } from '../dashboard/ixo-dashboard-slideshow/ixo-dashboard-slideshow.component';
import { IxoDashboardStatisticsOverviewComponent } from '../dashboard/ixo-statistics-overview/ixo-statistics-overview.component';
import { IxoDashboardGalleryComponent } from '../dashboard/ixo-dashboard-gallery/ixo-dashboard-gallery.component';
import { IxoDashboardGraphComponent } from '../dashboard/ixo-dashboard-graph/ixo-dashboard-graph.component';
import { IxoDashboardTableComponent } from '../dashboard/ixo-dashboard-table/ixo-dashboard-table.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private components: { [key: string]: any } = {};

  constructor() {
    this.registerComponent('slideshow', IxoDashboardSlideshowComponent);
    this.registerComponent('counter', IxoDashboardCounterComponent);
    this.registerComponent('statistic-overview', IxoDashboardStatisticsOverviewComponent);
    this.registerComponent('gallery', IxoDashboardGalleryComponent);
    this.registerComponent('graph', IxoDashboardGraphComponent);
    this.registerComponent('table', IxoDashboardTableComponent);
  }

  registerComponent(key: string, component: any) {
    this.components[key] = component;
  }

  getComponent(key: string): any {
    return this.components[key];
  }
}
