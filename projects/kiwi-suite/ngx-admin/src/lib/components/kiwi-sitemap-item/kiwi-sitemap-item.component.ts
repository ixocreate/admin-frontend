import { Component, Input, OnInit } from '@angular/core';
import { Page, PageElement } from '../../interfaces/page.interface';
import { KiwiDateTimePipe } from '../../pipes/kiwi-date-time.pipe';

@Component({
  selector: 'kiwi-sitemap-item',
  templateUrl: './kiwi-sitemap-item.component.html',
})
export class KiwiSitemapItemComponent implements OnInit {

  @Input() locale: string;
  @Input() page: Page;

  collapsed = false;

  constructor(private dateTimePipe: KiwiDateTimePipe) {
  }

  ngOnInit() {
  }

  get pageUrl(): string {
    return this.page.pages[this.locale] ? this.page.pages[this.locale].url : null;
  }

  get pageData(): PageElement {
    return this.page.pages[this.locale] ? this.page.pages[this.locale].page : null;
  }

  get pageName(): string {
    if (this.pageData) {
      return this.pageData.name;
    }
    const pages = [];
    for (const locale of Object.keys(this.page.pages)) {
      pages.push(locale + ': ' + this.page.pages[locale].page.name);
    }
    return '<div class="other-languages">' + pages.join(' / ') + '</div>';
  }

  get publishedString() {
    if (this.pageData && (this.pageData.publishedFrom !== null || this.pageData.publishedUntil !== null)) {
      return this.dateTimePipe.transform(this.pageData.publishedFrom) + ' - ' + this.dateTimePipe.transform(this.pageData.publishedUntil);
    }
    return null;
  }
}
