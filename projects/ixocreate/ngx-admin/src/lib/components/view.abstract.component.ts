import { ViewChild } from '@angular/core';
import { KiwiContentComponent } from './kiwi-content/kiwi-content.component';

export abstract class ViewAbstractComponent {

  @ViewChild(KiwiContentComponent) kiwiContent: KiwiContentComponent;

  protected constructor() {
  }

}
