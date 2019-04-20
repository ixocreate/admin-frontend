import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page, PageElement } from '../../interfaces/page.interface';
import { IxoDateTimePipe } from '../../pipes/ixo-date-time.pipe';
import { CopyService } from '../../services/copy.service';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  selector: 'ixo-sitemap-item',
  templateUrl: './ixo-sitemap-item.component.html',
})
export class IxoSitemapItemComponent implements OnInit {

  @Input() locale: string;
  @Input() page: Page;
  @Input() parentPage: Page = null;

  @Output() moved = new EventEmitter<Page>();

  collapsed = false;

  constructor(private dateTimePipe: IxoDateTimePipe, private copy: CopyService, private appData: AppDataService) {
  }

  ngOnInit() {
  }

  get isOnline(): boolean {
    return this.page.pages[this.locale] ? this.page.pages[this.locale].isOnline : false;
  }

  get pageUrl(): string {
    return this.page.pages[this.locale] ? this.page.pages[this.locale].url : null;
  }

  get pageData(): PageElement {
    return this.page.pages[this.locale] ? this.page.pages[this.locale].page : null;
  }

  get pageName(): string {
    let dotClass = 'text-danger';
    if (this.isOnline) {
      dotClass = 'text-success';
    }
    const dot = '<span class="' + dotClass + ' mr-1"><i class="fa fa-circle"></i></span>';

    if (this.pageData) {
      return dot + this.pageData.name;
    }
    const pages = [];
    for (const locale of Object.keys(this.page.pages)) {
      pages.push(locale + ': ' + this.page.pages[locale].page.name);
    }
    return '<span class="other-languages">' + pages.join(' / ') + '</span>';
  }

  get publishedString() {
    if (this.pageData && (this.pageData.publishedFrom !== null || this.pageData.publishedUntil !== null)) {
      return this.dateTimePipe.transform(this.pageData.publishedFrom) + ' - ' + this.dateTimePipe.transform(this.pageData.publishedUntil);
    }
    return null;
  }

  get moveType() {
    return this.copy.moveType;
  }

  get copyPage() {
    return this.copy.copyPage;
  }

  get isCopyPage() {
    return this.copyPage && this.copyPage === this.page;
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
    if (!this.copyPage) {
      return false;
    }
    let isAllowed = true;
    if (this.parentPage && this.parentPage.pageType.allowedChildren.indexOf(this.copyPage.pageType.name) === -1) {
      isAllowed = false;
    }
    if (this.isCopiedPageCurrentPageOrChildren(this.copyPage)) {
      isAllowed = false;
    }
    if (this.copyPage.pageType.isRoot === true && this.parentPage) {
      isAllowed = false;
    }
    if (this.copyPage.pageType.isRoot === false && !this.parentPage) {
      isAllowed = false;
    }
    return isAllowed;
  }

  get allowedInsertChild() {
    if (!this.copyPage) {
      return false;
    }
    let isAllowed = true;
    if (!this.page.childrenAllowed) {
      isAllowed = false;
    }
    if (this.page.pageType.allowedChildren.indexOf(this.copyPage.pageType.name) === -1) {
      isAllowed = false;
    }
    if (this.isCopiedPageCurrentPageOrChildren(this.copyPage)) {
      isAllowed = false;
    }
    if (this.copyPage.pageType.isRoot === true && this.parentPage) {
      isAllowed = false;
    }
    return isAllowed;
  }

  movePageStart(type: string) {
    this.copy.setCopyPage(this.page, type);
  }

  movePageEnd(prevSibling: Page, parent: Page) {
    const prevSiblingSitemapId: string = prevSibling ? prevSibling.sitemap.id : null;
    const parentSitemapId: string = parent ? parent.sitemap.id : null;

    if (this.copy.moveType === 'copy') {
      this.appData.postSitemapCopy(this.copyPage.sitemap.id, prevSiblingSitemapId, parentSitemapId).then(() => {
        this.copy.setCopyPage(null, null);
        this.triggerMoved(this.page);
      });
    } else {
      this.appData.postSitemapMove(this.copyPage.sitemap.id, prevSiblingSitemapId, parentSitemapId).then(() => {
        this.copy.setCopyPage(null, null);
        this.triggerMoved(this.page);
      });
    }
  }

  triggerMoved(page) {
    this.moved.emit(page);
  }
}
