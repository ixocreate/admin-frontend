import {Component, OnInit} from '@angular/core';
import {PageIndexComponent} from "../page/page-index.component";
import {takeUntil} from 'rxjs/operators';
import {Config} from '../../models/configuration.model';

@Component({
    selector: 'app-page-flat-index',
    templateUrl: './page-flat-index.component.html',
})
export class PageFlatIndexComponent extends PageIndexComponent implements OnInit {

    handle = "";
    ngOnInit() {
        this.initDataService("page");
        this.config.params$.pipe(takeUntil(this.destroyed$)).subscribe(
            (params: Config) => {
                this.onChangeLocale(params.intl.default);
            }
        );


    }

    protected loadData() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.handle = params.handle;
                this.dataService.loadListData({}, () => {
                    let url = this.config.params.routes['flatPagesIndex'];

                    return url.replace("{handle}", this.handle);
                });
            });

    }
}
