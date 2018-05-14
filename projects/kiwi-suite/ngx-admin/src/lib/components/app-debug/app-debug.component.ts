import {Component} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {AccountService, ConfigurationService, DataStoreService, SessionService} from '../../services';

@Component({
    selector: 'app-debug',
    templateUrl: './app-debug.component.html',
    styleUrls: ['./app-debug.component.scss']
})
export class AppDebugComponent {

    show = false;

    constructor(private config: ConfigurationService,
                private session: SessionService,
                private account: AccountService,
                private dataStore: DataStoreService,
                private _hotkeysService: HotkeysService) {
        this._hotkeysService.add(new Hotkey('alt+shift+d', (event: KeyboardEvent): boolean => {
            this.toggle();
            return false; // Prevent bubbling
        }));
    }

    get config$() {
        return this.config.params$;
    }

    get dataStore$() {
        return this.dataStore;
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
