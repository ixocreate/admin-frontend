import { Component } from '@angular/core';
import { PageTitleService } from './services/page-title.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AdminComponent {

  constructor(private pageTitle: PageTitleService) {
    this.pageTitle.init();
  }

}
