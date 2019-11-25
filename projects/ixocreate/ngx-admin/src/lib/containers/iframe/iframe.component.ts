import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent {

  @Input() height?: number;

  constructor() {
  }

}
