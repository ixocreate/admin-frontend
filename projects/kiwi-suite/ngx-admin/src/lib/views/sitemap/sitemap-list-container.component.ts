import {Component, Input} from '@angular/core';
import {ContainerComponent} from '@swimlane/ngx-dnd';

@Component({
    selector: 'app-sitemap-list-container',
    templateUrl: './sitemap-list-container.component.html',
})
export class SitemapListContainerComponent extends ContainerComponent {
    @Input()
    locale: string;

    onDrop(event) {
        this.drop.emit(event);
    }
}
