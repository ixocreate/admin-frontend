import { Component } from '@angular/core';
import { PageTitleService } from './services/page-title.service';
import Quill from 'quill';

const Parchment = Quill.import('parchment');
const LineBreakClass = new Parchment.Attributor.Class('linebreak', 'linebreak', {
  scope: Parchment.Scope.BLOCK,
});
Quill.register('formats/linebreak', LineBreakClass);

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AdminComponent {

  constructor(pageTitle: PageTitleService) {
    pageTitle.init();
  }

}
