import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { KiwiContentComponent } from '../../components/kiwi-content/kiwi-content.component';
import { ViewAbstractComponent } from '../../components/view.abstract.component';

@Component({
  templateUrl: './page.component.html',
})
export class PageComponent extends ViewAbstractComponent {

  constructor() {
    super();
  }

}
