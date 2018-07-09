import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Input,
    TemplateRef,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.scss'],
})
export class AppContentComponent implements AfterViewInit {
    @ContentChild('content')
    mainContent: TemplateRef<any>;

    @ContentChild('aside')
    asideContent: TemplateRef<any>;

    @ContentChild('header')
    headerContent: TemplateRef<any>;

    @Input()
    title: string = '';

    headerHeight = 0;
    @ViewChild('titleContainer') titleContainer: ElementRef;

    @HostListener('window:resize') onResize() {
        if (this.titleContainer) {
            this.headerHeight = this.titleContainer.nativeElement.clientHeight;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.headerHeight = this.titleContainer.nativeElement.clientHeight;
        });
    }
}
