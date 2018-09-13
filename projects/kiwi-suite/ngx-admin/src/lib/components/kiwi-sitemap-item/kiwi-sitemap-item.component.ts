import { Component, Input, OnInit } from '@angular/core';
import { Page, PageElement } from '../../interfaces/page.interface';
import { KiwiDateTimePipe } from '../../pipes/kiwi-date-time.pipe';
import { CopyService } from '../../services/copy.service';

@Component({
  selector: 'kiwi-sitemap-item',
  templateUrl: './kiwi-sitemap-item.component.html',
})
export class KiwiSitemapItemComponent implements OnInit {

  @Input() locale: string;
  @Input() page: Page;
  @Input() parentPage: Page = null;

  collapsed = false;

  moveType: string;


  constructor(private dateTimePipe: KiwiDateTimePipe, private copy: CopyService) {
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
      return this.pageData.name + ' <span class="page-type-info">(' + this.page.pageType.label + ')</span>';
    }
    const pages = [];
    for (const locale of Object.keys(this.page.pages)) {
      pages.push(locale + ': ' + this.page.pages[locale].page.name);
    }
    return '<span class="other-languages">' + pages.join(' / ') + '</span> <span class="page-type-info">(' + this.page.pageType.label + ')</span>';
  }

  get publishedString() {
    if (this.pageData && (this.pageData.publishedFrom !== null || this.pageData.publishedUntil !== null)) {
      return this.dateTimePipe.transform(this.pageData.publishedFrom) + ' - ' + this.dateTimePipe.transform(this.pageData.publishedUntil);
    }
    return null;
  }

  get copiedPage() {
    return this.copy.copyPage;
  }

  isCopiedPageCurrentPageOrChildren(page: Page): boolean {
    let isPageOrSubPage = false;
    if (page === this.page) {
      isPageOrSubPage = true;
    } else if (page.children) {
      for (const childPage of page.children) {
        if (this.isCopiedPageCurrentPageOrChildren(childPage)) {
          isPageOrSubPage = true;
        }
      }
    }
    return isPageOrSubPage;
  }

  get allowedInsertSibling() {
    let isAllowed = true;
    if (this.parentPage && this.parentPage.pageType.allowedChildren.indexOf(this.copy.copyPage.pageType.name) === -1) {
      isAllowed = false;
    }
    if (this.isCopiedPageCurrentPageOrChildren(this.copy.copyPage)) {
      isAllowed = false;
    }
    return isAllowed;
  }

  get allowedInsertChild() {
    let isAllowed = true;
    if (this.page.pageType.allowedChildren.indexOf(this.copy.copyPage.pageType.name) === -1) {
      isAllowed = false;
    }
    if (this.page.children && this.page.children.length > 0) {
      isAllowed = false;
    }
    if (this.isCopiedPageCurrentPageOrChildren(this.copy.copyPage)) {
      isAllowed = false;
    }
    return isAllowed;
  }

  movePage(type: string) {
    this.moveType = type;
    this.copy.setCopyPage(this.page);
  }
}
