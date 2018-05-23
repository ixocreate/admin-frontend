import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'app-sitemap-list-item',
    templateUrl: './sitemap-list-item.component.html',
})
export class SitemapListItemComponent implements OnInit {
    @Input() item: any;
    @Output() dropped = new EventEmitter<any>();
    @Output() dragged = new EventEmitter<any>();

    dropZone: string;

    constructor() {
    }

    ngOnInit() {

    }

    drop(event: any) {
        this.dropZone = null;
        this.dropped.emit(event);
    }

    drag(event: any) {
        this.dropZone = event.value.pageType;
        this.dragged.emit(event);
    }
}
