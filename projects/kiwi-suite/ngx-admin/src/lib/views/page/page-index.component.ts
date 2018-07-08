import {Component, OnInit} from '@angular/core';
import {ResourceIndexComponent} from '../resource';

@Component({
    selector: 'app-page-index',
    templateUrl: './page-index.component.html',
})
export class PageIndexComponent extends ResourceIndexComponent implements OnInit {
    protected type = "page";
    selectedLocale: string;

    onChangeLocale(locale) {
        this.selectedLocale = locale;
    }

    ngOnInit() {
        this.initDataService(this.type);
    }

    protected loadData() {

    }
}
