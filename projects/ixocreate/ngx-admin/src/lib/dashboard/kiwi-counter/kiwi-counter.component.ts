import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiwi-dashboard-counter',
  templateUrl: './kiwi-counter.component.html',
})
export class KiwiDashboardCounterComponent {
  @Input() data;
}
