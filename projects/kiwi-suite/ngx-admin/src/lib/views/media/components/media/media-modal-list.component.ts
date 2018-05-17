import {Component, EventEmitter, Output} from '@angular/core';
import {Media} from '../../../../models';
import {MediaListComponent} from '../../media-list.component';

@Component({
    selector: 'media-modal-list',
    templateUrl: './media-modal-list.component.html',
})
export class MediaModalListComponent extends MediaListComponent {
    @Output() onSelect = new EventEmitter<Media>();

    select(media: Media) {
        this.onSelect.emit(media);
    }
}
