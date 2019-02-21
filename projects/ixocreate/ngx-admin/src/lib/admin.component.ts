import { Component } from '@angular/core';
import { PageTitleService } from './services/page-title.service';
import Quill from 'quill';
import { ConfigService } from './services/config.service';
import { LocalStorageService } from './services/local-storage.service';

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

  constructor(pageTitle: PageTitleService, config: ConfigService, localStorage: LocalStorageService) {
    pageTitle.init();

    const selectedLocale = localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, config.config.intl.default);
    let localeFound = false;
    for (const locale of config.config.intl.locales) {
      if (locale.locale === selectedLocale) {
        localeFound = true;
      }
    }
    if (!localeFound) {
      localStorage.setItem(LocalStorageService.SELECTED_LANGUAGE, config.config.intl.locales[0].locale);
    }
  }

}
