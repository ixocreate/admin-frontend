import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-aside',
    templateUrl: './app-aside.component.html',
    styleUrls: ['./app-aside.component.scss'],
})
export class AppAsideComponent implements OnInit, OnDestroy {

    @HostBinding('class.aside-menu') asideMenu: boolean = true;

    constructor() {
    }

    ngOnInit() {
        document.querySelector('body').classList.add('aside-menu-lg-show');
    }

    ngOnDestroy() {
        document.querySelector('body').classList.remove('aside-menu-lg-show');
    }
}
