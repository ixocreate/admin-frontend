import {browser, by, element} from 'protractor';

export class DashboardPage {
    navigateTo() {
        return browser.get('/');
    }

    getActiveNavLinkText() {
        return element(by.css('app-dashboard .nav-link.active')).getText();
    }
}
