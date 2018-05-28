import {Component, OnInit} from '@angular/core';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-sitemap-edit',
    templateUrl: './media-sitemap.component.html',
})
export class SitemapEditComponent extends ResourceEditComponent implements OnInit {

    protected pathPrefix = '';

    initForm() {

    }
}
