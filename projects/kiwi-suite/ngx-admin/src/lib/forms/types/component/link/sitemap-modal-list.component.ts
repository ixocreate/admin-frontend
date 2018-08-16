import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SitemapListComponent} from "../../../../views/page/components/sitemap-list.component";

@Component({
    selector: 'sitemap-modal-list',
    templateUrl: './sitemap-modal-list.component.html',
})
export class SitemapModalListComponent extends SitemapListComponent implements OnInit {

    @Output() onSelect = new EventEmitter<any>();

    ngOnInit(): void {
        super.ngOnInit();
    }

    select(page: any) {
        this.onSelect.emit(page);
    }
}
