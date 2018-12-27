import { Component } from '@angular/core';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './media.component.html',
})
export class MediaComponent extends ViewAbstractComponent {

  constructor(private router: Router) {
    super();
  }

  onSelect(element) {
    this.router.navigateByUrl('media/' + element.id + '/edit');
  }

}
