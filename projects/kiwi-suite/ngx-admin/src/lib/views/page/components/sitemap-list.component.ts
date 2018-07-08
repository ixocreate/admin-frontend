import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResourceIndexComponent} from "../../resource/resource-index.component";
import {PageService} from "../../../services/resource/page.service";

@Component({
    selector: 'sitemap-list',
    templateUrl: './sitemap-list.component.html',
})
export class SitemapListComponent extends ResourceIndexComponent implements OnInit {
    protected type = "page";
    selectedLocale: string;
    dataService: PageService;

    @Output() changeLocale = new EventEmitter<any>();

    onChangeLocale() {
        this.changeLocale.emit(this.selectedLocale);
    }

    ngOnInit() {
        this.initDataService(this.type);
        this.selectedLocale = this.config.params.intl.default;
        this.onChangeLocale();
    }

    get locales() {
        return this.config.params.intl.locales;
    }

    drop(event: any) {
        this.data$.subscribe(
            (items) => {
                this.dataService.saveSort(this.getInfo(event.value.sitemap.id, items.items, null)).subscribe();
            }
        );
    }

    drag(event: any) {
    }

    protected getInfo(searchId: string, items: any, parent: string): { id: string, parent: string, prevSibling: string } {
        let prevSibling: string = null;
        for (let item of items) {
            if (item.sitemap.id === searchId) {
                return {
                    parent: parent,
                    prevSibling: prevSibling,
                    id: searchId,
                };
            }
            prevSibling = item.sitemap.id;
        }

        let result: { id: string, parent: string, prevSibling: string } = null;
        for (let item of items) {
            result = this.getInfo(searchId, item.children, item.sitemap.id);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }
}
