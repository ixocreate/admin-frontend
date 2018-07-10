import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContainerComponent} from '@swimlane/ngx-dnd';
import {BehaviorSubject} from "rxjs/Rx";

@Component({
    selector: 'sitemap-list-container',
    templateUrl: './sitemap-list-container.component.html',
})
export class SitemapListContainerComponent extends ContainerComponent {
    @Input('locale') locale: string;
    @Input('model') model: any;
    @Input('dragPageType') dragPageType$: BehaviorSubject<string>;

    @Input('showDropableBox') showDropableBox: boolean;

    onDrop(event) {
        this.drop.emit(event);
    }

    onDrag(event) {
        this.drag.emit(event);
    }

    onCancel(event) {
        this.cancel.emit(event);
    }

    get showEmptyBox()
    {
        if (this.showDropableBox === false) {
            return false;
        }

        return true;
    }
}
