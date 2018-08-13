import { ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { KiwiContentComponent } from './kiwi-content/kiwi-content.component';

export class ViewAbstractComponent {

  @ViewChild(KiwiContentComponent) kiwiContent: KiwiContentComponent;

  constructor() {
  }

}
