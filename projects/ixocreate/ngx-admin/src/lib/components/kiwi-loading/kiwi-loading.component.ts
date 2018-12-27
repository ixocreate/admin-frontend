import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiwi-loading',
  templateUrl: './kiwi-loading.component.html',
})
export class KiwiLoadingComponent {

  @Input() type = '';

}
