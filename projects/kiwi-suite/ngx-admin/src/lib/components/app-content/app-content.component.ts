import {AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit{
    @ContentChild('content')
    mainContent: TemplateRef<any>;

    @ContentChild('aside')
    asideContent: TemplateRef<any>;

    @ContentChild('header')
    headerContent: TemplateRef<any>;

    @Input()
    title: string = "";

    aside = false;

    ngOnInit(): void {
        if (this.asideContent) {
            this.aside = true;
        }
    }
}
