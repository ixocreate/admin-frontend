import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiwi-dashboard-gallery',
  templateUrl: './kiwi-gallery.component.html',
})
export class KiwiDashboardGalleryComponent {
  @Input() data;
}
