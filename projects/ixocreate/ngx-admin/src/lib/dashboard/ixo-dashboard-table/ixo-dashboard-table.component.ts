import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard-table',
  templateUrl: './ixo-dashboard-table.component.html',
})
export class IxoDashboardTableComponent {
  @Input() data;
}
