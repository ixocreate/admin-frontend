import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard-slideshow',
  templateUrl: './ixo-slideshow.component.html',
})
export class IxoDashboardSlideshowComponent {
  @Input() data;
}
