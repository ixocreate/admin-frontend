import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<app-loader></app-loader><app-debug>™</app-debug><router-outlet></router-outlet>'
})
export class AdminComponent implements OnInit{
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
