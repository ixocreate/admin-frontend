import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-dashboard-gallery',
  templateUrl: './ixo-gallery.component.html',
})
export class IxoDashboardGalleryComponent {
  @Input() data;
}
