import { Component } from '@angular/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = null;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(public accountData: AccountDataService, public appData: AppDataService) {
    this.changes = new MutationObserver(() => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
    });

    this.appData.config$.subscribe(() => {
      this.navItems = this.appData.navigation;
    });
  }
}
