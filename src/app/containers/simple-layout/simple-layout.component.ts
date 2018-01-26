import {Component} from '@angular/core';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './simple-layout.component.html',
})
export class SimpleLayoutComponent {
    constructor(private config: ConfigurationService) {
    }

    get config$() {
        return this.config.params$;
    }
}
