import { Injectable } from '@angular/core';
import { IxoDashboardCounterComponent } from '../dashboard/ixo-counter/ixo-counter.component';
import { IxoDashboardSlideshowComponent } from '../dashboard/ixo-slideshow/ixo-slideshow.component';
import { IxoDashboardStatisticsOverviewComponent } from '../dashboard/ixo-statistics-overview/ixo-statistics-overview.component';
import { IxoDashboardGalleryComponent } from '../dashboard/ixo-gallery/ixo-gallery.component';
import { IxoDashboardGraphComponent } from '../dashboard/ixo-graph/ixo-graph.component';

@Injectable()
export class DashboardService {

  private components: { [key: string]: any } = {};

  constructor() {
    this.registerComponent('slideshow', IxoDashboardSlideshowComponent);
    this.registerComponent('counter', IxoDashboardCounterComponent);
    this.registerComponent('statistic-overview', IxoDashboardStatisticsOverviewComponent);
    this.registerComponent('gallery', IxoDashboardGalleryComponent);
    this.registerComponent('graph', IxoDashboardGraphComponent);
  }

  registerComponent(key: string, component: any) {
    this.components[key] = component;
  }

  getComponent(key: string): any {
    return this.components[key];
  }
}
