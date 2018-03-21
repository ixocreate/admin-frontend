import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    selector: 'app-background',
    template: `
        <div style="position: fixed; top:0; left:0; right: 0; bottom: 0; z-index:-1; opacity: 0.7; background-position: center center; background-size: cover; background-image: url(assets/img/kiwi-background.jpg) ">
        </div>`
})
export class AppBackgroundComponent {
    backgroundUrl: string;

    constructor(private config: ConfigurationService) {
    }
}
