import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'kiwi-dashboard-graph',
  templateUrl: './kiwi-graph.component.html',
})
export class KiwiDashboardGraphComponent {

  public results = undefined;

  public showXAxisLabel = false;
  public xAxisLabel = '';
  public showYAxisLabel = false;
  public yAxisLabel = '';

  public customColors = [];

  @Input('data')
  set model(data) {
    if (!data) {
      return;
    }

    if (data.datasets.length === 0) {
      return;
    }

    this.results = data.datasets;

    if (data.xAxisLabel !== null) {
      this.showXAxisLabel = true;
      this.xAxisLabel = data.xAxisLabel;
    }
    if (data.yAxisLabel !== null) {
      this.showYAxisLabel = true;
      this.yAxisLabel = data.yAxisLabel;
    }
    this.customColors = data.customColors;
  }

  // options
  lineChartShowXAxis = true;
  lineChartShowYAxis = true;
  lineChartGradient = false;
  lineChartShowLegend = false;

  lineChartColorScheme = {
    domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA'],
  };

  lineChartLineInterpolation = shape.curveBasis;

}
