import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kiwi-loading',
  templateUrl: './kiwi-loading.component.html',
})
export class KiwiLoadingComponent implements OnInit {

  @Input() type = '';

  constructor() {
  }

  ngOnInit() {
  }

}
