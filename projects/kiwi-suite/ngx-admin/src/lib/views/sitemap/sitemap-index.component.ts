import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../services';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'app-sitemap-index',
    templateUrl: './sitemap-index.component.html',
})
export class SitemapIndexComponent extends ResourceIndexComponent implements OnInit {

    selectedLocale: string;

    constructor(protected route: ActivatedRoute,
                protected dataService: PageService) {
        super(route);
    }

    onChangeLocale(locale) {
        this.selectedLocale = locale;
    }
}
