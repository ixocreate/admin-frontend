import { Component } from '@angular/core';
import { ViewAbstractComponent } from '../../components/view.abstract.component';

@Component({
  templateUrl: './page.component.html',
})
export class PageComponent extends ViewAbstractComponent {

  constructor() {
    super();
  }

}
