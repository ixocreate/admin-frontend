import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard',
  templateUrl: './ixo-dashboard.component.html',
})
export class IxoDashboardComponent {
  @Input() data;
}
