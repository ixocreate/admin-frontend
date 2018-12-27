import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'kiwi-sitemap',
  templateUrl: './kiwi-sitemap.component.html',
})
export class KiwiSitemapComponent implements OnInit {

  data$: Promise<any>;
  pageIndex$: Promise<any>;

  selectedLocale: string;

  @Output() changeLocale = new EventEmitter<any>();

  @Input() items = () => {
      return this.appData.getPageIndex();
  }
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
    this.pageIndex$ = this.items();
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  pageMoved() {
    this.loadPages();
  }
}
