import { ChangeDetectorRef, Component, ComponentFactoryResolver, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'ixo-dashboard-graph',
  templateUrl: './ixo-graph.component.html',
})
export class IxoDashboardGraphComponent {

  public results = undefined;

  public showXAxisLabel = false;
  public xAxisLabel = '';
  public showYAxisLabel = false;
  public yAxisLabel = '';

  public customColors = [];

  @Input() set data(data) {
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
