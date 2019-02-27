import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ixo-content',
  templateUrl: './ixo-content.component.html',
})
export class IxoContentComponent {
  @ContentChild('headerButtons') headerButtons: TemplateRef<any>;
  @ContentChild('aside') aside: TemplateRef<any>;

  headerHeight = 0;
}
