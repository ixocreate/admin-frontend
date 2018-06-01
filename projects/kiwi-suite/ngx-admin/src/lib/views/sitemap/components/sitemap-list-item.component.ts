import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContainerComponent, DraggableDirective, ItemComponent} from '@swimlane/ngx-dnd';

@Component({
    selector: 'sitemap-list-item',
    templateUrl: './sitemap-list-item.component.html',
    providers: [ContainerComponent, DraggableDirective],
})
export class SitemapListItemComponent extends ItemComponent {
    objectKeys = Object.keys;

    @Input()
    locale: string;

    @Output()
    drop: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        public container: ContainerComponent,
        public draggableDirective: DraggableDirective
    ) {
        super(container, draggableDirective);
    }

    onDrop(event) {
        this.drop.emit(event);
    }
}
