import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MediaService} from '../../services';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'app-media-list',
    templateUrl: './media-index.component.html',
})
export class MediaIndexComponent extends ResourceIndexComponent implements OnInit {

    constructor(protected dataService: MediaService,
                protected route: ActivatedRoute) {
        super(route);
    }
}
