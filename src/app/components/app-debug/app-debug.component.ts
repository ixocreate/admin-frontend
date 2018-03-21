import {Component} from '@angular/core';
import {AccountService, ConfigurationService, SessionService} from '../../../kiwi/services';

@Component({
    selector: 'app-debug',
    templateUrl: './app-debug.component.html'
})
export class AppDebugComponent {

    show = false;

    constructor(private config: ConfigurationService,
                private session: SessionService,
                private account: AccountService) {

    }

    get config$() {
        return this.config.params$;
    }

    loadSession() {
        this.session.load();
    }

    loadUser() {
        this.account.load();
    }

    loadConfig() {
        this.config.load();
    }

    toggle() {
        this.show = !this.show;
    }

    configReady(ready) {
        this.config.nextReady(ready);
    }

    sessionReady(ready) {
        this.session.nextReady(ready);
    }
}
