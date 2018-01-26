import {Component} from '@angular/core';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
    constructor(private config: ConfigurationService) {
    }

    get config$() {
        return this.config.params$;
    }
}
