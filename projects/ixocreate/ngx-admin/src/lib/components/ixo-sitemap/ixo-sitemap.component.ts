import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { CopyService } from '../../services/copy.service';

@Component({
  selector: 'ixo-sitemap',
  templateUrl: './ixo-sitemap.component.html',
})
export class IxoSitemapComponent implements OnInit {

  data$: Promise<any>;
  pageIndex$: Promise<any>;

  selectedLocale: string;

  @Output() changeLocale = new EventEmitter<any>();

  @Input() items = () => {
    return this.appData.getSitemapIndex();
  };

  constructor(private config: ConfigService,
              private localStorage: LocalStorageService,
              private copy: CopyService,
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

  get isCopying() {
    return !!this.copy.copyPage;
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  pageMoved() {
    this.loadPages();
  }

  cancelCopy() {
    this.copy.setCopyPage(null, null);
  }
}
