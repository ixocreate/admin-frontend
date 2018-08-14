import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'kiwi-pagination',
  templateUrl: './kiwi-pagination.component.html',
})
export class KiwiPaginationComponent implements OnInit {

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
