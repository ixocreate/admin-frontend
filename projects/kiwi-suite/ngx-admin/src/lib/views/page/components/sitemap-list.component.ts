import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ResourceIndexComponent} from "../../resource/resource-index.component";
import {PageService} from "../../../services/resource/page.service";
import {ActivatedRoute} from "@angular/router";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap";
import {BehaviorSubject} from "rxjs/index";
import {ResourceListModel} from "../../../models/api.model";
import {Subscription} from "rxjs/Rx";

@Component({
    selector: 'sitemap-list',
    templateUrl: './sitemap-list.component.html',
})
export class SitemapListComponent extends ResourceIndexComponent implements OnInit, OnDestroy {
    protected type = "page";
    selectedLocale: string;
    dataService: PageService;

    modalRef: BsModalRef;

    items: ResourceListModel;
    subscribtion: Subscription;

    private sortSitemapId: string;

    dragPageTypes = [];

    dragPageType$ = new BehaviorSubject<string>(null);

    @Output() changeLocale = new EventEmitter<any>();

    constructor(protected route: ActivatedRoute, private modalService: BsModalService) {
        super(route);
    }

    onChangeLocale() {
        this.changeLocale.emit(this.selectedLocale);
    }

    ngOnInit() {
        this.initDataService(this.type);
        this.selectedLocale = this.config.params.intl.default;
        this.onChangeLocale();

        this.subscribtion = this.data$.subscribe(
            (items) => {
                this.items = items;
            }
        );
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }

    get locales() {
        return this.config.params.intl.locales;
    }

    drop(event: any, template: TemplateRef<any>) {
        this.dragPageType$.next(null);
        this.dragPageTypes = [];
        this.modalRef = this.modalService.show(template, {
            backdrop: true,
                ignoreBackdropClick: false,
                class: 'modal-sm'
        });
        this.sortSitemapId = event.value.sitemap.id;
    }

    sort() {
        this.dataService.saveSort(this.getPosition(this.sortSitemapId, this.items.items, null)).subscribe(() => {
            this.sortSitemapId = null;
            this.loadData();
            this.modalRef.hide();
        });
    }

    dismiss() {
        this.sortSitemapId = null;
        this.loadData();
        this.modalRef.hide();
    }

    drag(event: any) {
        const info = this.getInfo(event.value.sitemap.id, this.items.items);

        if (info === null) {
            this.dragPageType$.next(null);
            this.dragPageTypes = [];
            return;
        }
        this.dragPageType$.next(info.pageType.name);
        this.dragPageTypes = [info.pageType.name];
    }

    cancel(event: any) {
        // TODO: this event cancels moving pages to be a child of another page
        // this.dragPageType$.next(null);
        // this.dragPageTypes = [];
        // this.loadData();
    }

    protected getPosition(searchId: string, items: any, parent: string): { id: string, parent: string, prevSibling: string } {
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
            result = this.getPosition(searchId, item.children, item.sitemap.id);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }

    protected getInfo(searchId: string, items: any)
    {
        for (let item of items) {
            if (item.sitemap.id === searchId) {
                return item;
            }
        }

        for (let item of items) {
            let result = this.getInfo(searchId, item.children);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }
}
