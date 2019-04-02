import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ixo-button',
  templateUrl: './ixo-button.component.html',
})
export class IxoButtonComponent implements OnInit {

  private _block: boolean = false;

  get block() {
    return this._block;
  }

  @HostBinding('class.ixo-button-block') public btnBlock = false;

  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'dark' | 'ligh' = 'primary';
  @Input() icon: string | null = null;
  @Input() outline = false;

  @Input() set block(block: boolean) {
    this.btnBlock = block;
    this._block = block;
  }

  @Input() loading = false;
  @Input() disabled = false;
  textVisible = true;

  @ViewChild('contentWrapper') contentWrapper;

  constructor() {
  }

  ngOnInit() {
    this.textVisible = this.contentWrapper.nativeElement.childNodes.length !== 0;
  }

  public buttonClick(event: MouseEvent) {
    if (this.loading || this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

}
