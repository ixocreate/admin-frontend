import {Component} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {map} from 'rxjs/operators';
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

    get routes$() {
        return this.config.params$.pipe(map(params => {
            let keys = Object.keys(params.routes),
                target = {};
            keys.sort();
            keys.forEach(function (key) {
                target[key] = params.routes[key];
            });
            return target;
        }));
    }

    get dataStoreServices() {
        return Object.keys(this.dataStore.services);
    }

    get session$() {
        return this.session.ready$;
    }

    get user$() {
        return this.account.user$;
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
