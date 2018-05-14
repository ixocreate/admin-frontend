import {Component} from '@angular/core';
import {ConfigurationService} from '../../services';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {

    constructor(private config: ConfigurationService) {

    }

    get config$() {
        return this.config.params$;
    }
}
