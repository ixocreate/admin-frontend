import {Component} from '@angular/core';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    selector: 'app-debug',
    templateUrl: './app-debug.component.html'
})
export class AppDebugComponent {

    constructor(private config: ConfigurationService) {

    }

    get config$() {
        return this.config.params$;
    }
}
