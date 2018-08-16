import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContainerComponent, DraggableDirective, ItemComponent} from '@swimlane/ngx-dnd';
import {BehaviorSubject, Subscription} from "rxjs/Rx";

@Component({
    selector: 'sitemap-list-item',
    templateUrl: './sitemap-list-item.component.html',
    providers: [ContainerComponent, DraggableDirective],
})
export class SitemapListItemComponent extends ItemComponent implements OnInit, OnDestroy{
    objectKeys = Object.keys;

    collapse: boolean = false;

    @Input()
    locale: string;

    @Input('dragPageType') dragPageType$: BehaviorSubject<string>;

    private dragPageTypeSubscribtion: Subscription;

    @Output()
    drop: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    drag: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();

    internalDropZone: any = "";

    constructor(
        public container: ContainerComponent,
        public draggableDirective: DraggableDirective
    ) {
        super(container, draggableDirective);
    }

    ngOnInit()
    {
        super.ngOnInit();
        if (! this.dragPageType$) {
            return;
        }

        this.dragPageTypeSubscribtion = this.dragPageType$.asObservable().subscribe(
            (pageType) => {
                if (pageType === null) {
                    this.internalDropZone = "";
                    return;
                }
                if (this.model.pageType.allowedChildren.includes(pageType)) {
                    this.internalDropZone = pageType;

                    return;
                }

                this.internalDropZone = "";
            }
        );
    }

    ngOnDestroy()
    {
        if (! this.dragPageTypeSubscribtion) {
            return;
        }

        this.dragPageTypeSubscribtion.unsubscribe();
    }

    onDrop(event) {
        this.internalDropZone = "";
        this.drop.emit(event);
    }

    onDrag(event) {
        this.drag.emit(event);
    }

    onCancel(event) {
        this.cancel.emit(event);
    }
}
