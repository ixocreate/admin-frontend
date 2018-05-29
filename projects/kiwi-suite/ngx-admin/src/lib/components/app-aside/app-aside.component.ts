import {Component} from '@angular/core';
import {AsideService} from "../../services/aside.service";

@Component({
    selector: 'app-aside',
    templateUrl: './app-aside.component.html'
})
export class AppAsideComponent {

    constructor(public asideService: AsideService) {
    }
}
