import {Component} from '@angular/core';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<app-background></app-background><app-loader></app-loader><app-debug></app-debug><router-outlet></router-outlet>'
})
export class AdminComponent {
}
