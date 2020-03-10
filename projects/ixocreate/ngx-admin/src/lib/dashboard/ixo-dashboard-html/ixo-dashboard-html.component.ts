import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard-html',
  templateUrl: './ixo-dashboard-html.component.html',
})
export class IxoDashboardHtmlComponent {
  @Input() data;
}
