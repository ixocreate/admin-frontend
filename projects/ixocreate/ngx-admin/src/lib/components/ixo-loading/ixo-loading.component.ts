import { Component, Input } from '@angular/core';

@Component({
  selector: 'ixo-loading',
  templateUrl: './ixo-loading.component.html',
})
export class IxoLoadingComponent {

  @Input() type = '';

}
