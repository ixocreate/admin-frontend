import {Component} from '@angular/core';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {

    constructor(private config: ConfigurationService) {
    }

    get config$() {
        return this.config.params$;
    }
}
