import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiwi-dashboard-statistics-overview',
  templateUrl: './kiwi-statistics-overview.component.html',
})
export class KiwiDashboardStatisticsOverviewComponent {
  @Input() data;
}
