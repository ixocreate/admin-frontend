import {Component, OnInit} from '@angular/core';
import {ResourceIndexComponent} from '../resource';
import {takeUntil} from 'rxjs/operators';
import {Config} from '../../models/configuration.model';

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
        this.config.params$.pipe(takeUntil(this.destroyed$)).subscribe(
            (params: Config) => {
                this.onChangeLocale(params.intl.default);
            }
        );
    }

    protected loadData() {

    }
}
