import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, } from '@angular/core';

@Component({
  selector: 'kiwi-content',
  templateUrl: './kiwi-content.component.html',
})
export class KiwiContentComponent implements AfterViewInit {
  @ViewChild('header') header: ElementRef;

  headerHeight = 0;
  paddingTop = 26;

  @HostListener('window:resize') onResize() {
    if (this.header) {
      this.headerHeight = this.header.nativeElement.clientHeight + this.paddingTop;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerHeight = this.header.nativeElement.clientHeight + this.paddingTop;
    });
  }
}
