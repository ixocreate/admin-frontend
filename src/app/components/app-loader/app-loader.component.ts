import {Component} from '@angular/core';
import {ConfigurationService} from '../../../kiwi/services';

@Component({
    selector: 'app-loader',
    templateUrl: './app-loader.component.html'
})
export class AppLoaderComponent {

    constructor(public config: ConfigurationService) {

    }

    get assetsUrl() {
        return this.config.params.assetsUrl;
    }

    get ready$() {
        return this.config.ready$;
    }

    get config$() {
        return this.config.params$;
    }

    get loading() {
        return this.config.loading;
    }
}
