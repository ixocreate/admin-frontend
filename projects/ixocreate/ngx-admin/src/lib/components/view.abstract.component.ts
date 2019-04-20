import { ViewChild } from '@angular/core';
import { IxoContentComponent } from './ixo-content/ixo-content.component';

export abstract class ViewAbstractComponent {

  @ViewChild(IxoContentComponent) ixoContent: IxoContentComponent;

  protected constructor() {
  }

}
