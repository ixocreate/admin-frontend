import {Component, Input} from '@angular/core';
import {ContainerComponent} from '@swimlane/ngx-dnd';

@Component({
    selector: 'sitemap-list-container',
    templateUrl: './sitemap-list-container.component.html',
})
export class SitemapListContainerComponent extends ContainerComponent {
    @Input('locale') locale: string;
    @Input('model') model: any;

    onDrop(event) {
        this.drop.emit(event);
    }
}
