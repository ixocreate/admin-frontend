import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'ixo-pagination',
  templateUrl: './ixo-pagination.component.html',
})
export class IxoPaginationComponent implements OnInit {

  @Input() itemsPerPage = 10;
  @Input() totalItems = 0;
  @Input() currentPage = 1;

  @Output() pageChanged = new EventEmitter<Media>();

  constructor() {
  }

  ngOnInit() {
  }

  onPage(event) {
    this.pageChanged.emit(event);
  }

}
