import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, TemplateRef, ViewChild, } from '@angular/core';

@Component({
  selector: 'kiwi-content',
  templateUrl: './kiwi-content.component.html',
})
export class KiwiContentComponent implements AfterViewInit {
  @ContentChild('content')
  mainContent: TemplateRef<any>;

  @ContentChild('aside')
  asideContent: TemplateRef<any>;

  @ContentChild('header')
  headerContent: TemplateRef<any>;

  @ViewChild('header') header: ElementRef;

  @Input() title = '';

  headerHeight = 0;

  @HostListener('window:resize') onResize() {
    if (this.header) {
      this.headerHeight = this.header.nativeElement.clientHeight;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerHeight = this.header.nativeElement.clientHeight;
    });
  }
}
