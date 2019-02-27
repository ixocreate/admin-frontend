import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard-statistics-overview',
  templateUrl: './ixo-statistics-overview.component.html',
})
export class IxoDashboardStatisticsOverviewComponent {
  @Input() data;
}
