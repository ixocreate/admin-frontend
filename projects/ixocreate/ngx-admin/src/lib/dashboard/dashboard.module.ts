import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { IxoDashboardCounterComponent } from './ixo-dashboard-counter/ixo-dashboard-counter.component';
import { IxoDashboardTableComponent } from './ixo-dashboard-table/ixo-dashboard-table.component';
import { IxoDashboardGraphComponent } from './ixo-dashboard-graph/ixo-dashboard-graph.component';
import { IxoDashboardSlideshowComponent } from './ixo-dashboard-slideshow/ixo-dashboard-slideshow.component';
import { IxoDashboardGalleryComponent } from './ixo-dashboard-gallery/ixo-dashboard-gallery.component';
import { IxoDashboardStatisticsOverviewComponent } from './ixo-statistics-overview/ixo-statistics-overview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IxoComponentsModule } from '../components/ixo-components.module';
import {IxoDashboardHtmlComponent} from "./ixo-dashboard-html/ixo-dashboard-html.component";

const COMPONENTS = [
  IxoDashboardCounterComponent,
  IxoDashboardGalleryComponent,
  IxoDashboardGraphComponent,
  IxoDashboardSlideshowComponent,
  IxoDashboardTableComponent,
  IxoDashboardHtmlComponent,
  IxoDashboardStatisticsOverviewComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CarouselModule.forRoot(),
    IxoComponentsModule,
    NgxChartsModule,
    CommonModule,
    PipesModule
  ],
  entryComponents: COMPONENTS,
  exports: COMPONENTS
})
export class DashboardModule {
}
