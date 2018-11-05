import { Component, Input } from '@angular/core';
@Component({
  selector: 'kiwi-dashboard-slideshow',
  templateUrl: './kiwi-slideshow.component.html',
})
export class KiwiDashboardSlideshowComponent {
  @Input() data;
}
