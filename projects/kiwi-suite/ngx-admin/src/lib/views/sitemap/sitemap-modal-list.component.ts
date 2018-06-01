import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResourceListComponent} from '../resource';
import {SitemapListComponent} from "./components/sitemap-list.component";

@Component({
    selector: 'sitemap-modal-list',
    templateUrl: './sitemap-modal-list.component.html',
})
export class SitemapModalListComponent extends SitemapListComponent {

  @Output() onSelect = new EventEmitter<any>();

  ngOnInit(): void {

      super.ngOnInit();
    this.dataService.load();
  }

  select(page: any) {
    this.onSelect.emit(page);
  }
}
