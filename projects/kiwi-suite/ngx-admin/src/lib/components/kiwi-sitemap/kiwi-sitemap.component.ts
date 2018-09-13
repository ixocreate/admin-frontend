import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'kiwi-sitemap',
  templateUrl: './kiwi-sitemap.component.html',
})
export class KiwiSitemapComponent implements OnInit {

  data$: Promise<any>;
  pages$: Promise<any>;

  selectedLocale: string;

  @Output() changeLocale = new EventEmitter<any>();

  constructor(private config: ConfigService,
              private localStorage: LocalStorageService,
              private appData: AppDataService) {
  }

  onChangeLocale() {
    this.localStorage.setItem(LocalStorageService.SELECTED_LANGUAGE, this.selectedLocale);
    this.changeLocale.emit(this.selectedLocale);
  }

  ngOnInit() {
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
    this.onChangeLocale();
    this.loadPages();
  }

  loadPages() {
    this.pages$ = this.appData.getPageIndex().then((response) => {
      return response.items;
    });
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  pageMoved() {
    this.loadPages();
  }
}
