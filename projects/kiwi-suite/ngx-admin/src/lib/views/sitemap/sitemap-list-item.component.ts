import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContainerComponent, DraggableDirective, ItemComponent} from "@swimlane/ngx-dnd";

@Component({
    selector: 'app-sitemap-list-item',
    templateUrl: './sitemap-list-item.component.html',
    providers: [ContainerComponent, DraggableDirective],
})
export class SitemapListItemComponent extends ItemComponent {

  @Output()
  drop: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    public container: ContainerComponent,
    public draggableDirective: DraggableDirective
  ) {
      super(container, draggableDirective);
  }

  onDrop(event) {
    this.drop.emit(event);
  }
}
