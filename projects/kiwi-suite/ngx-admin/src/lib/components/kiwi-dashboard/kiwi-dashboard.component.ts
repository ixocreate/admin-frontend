import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiwi-dashboard',
  templateUrl: './kiwi-dashboard.component.html',
})
export class KiwiDashboardComponent {
  @Input() data;
}
