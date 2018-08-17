import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'sitemap-modal-list-item',
    templateUrl: './sitemap-modal-list-item.component.html',
})
export class SitemapModalListItemComponent {

    objectKeys = Object.keys;

    @Input() items: any;

    @Input() locale: string;

    @Output() onSelect = new EventEmitter<any>();

    select(page: any) {
        this.onSelect.emit(page);
    }
}
