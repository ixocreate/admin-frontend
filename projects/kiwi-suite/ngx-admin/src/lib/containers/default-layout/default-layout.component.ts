import { AfterViewInit, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { AppDataService } from '../../services/data/app-data.service';
import { KiwiContentComponent } from '../../components/kiwi-content/kiwi-content.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements AfterViewInit {
  navItems = null;
  sidebarMinimized = true;
  private changes: MutationObserver;
  element: HTMLElement = document.body;

  aside: TemplateRef<any>;
  headerButtons: TemplateRef<any>;

  @ViewChild(KiwiContentComponent) content: TemplateRef<any>;

  constructor(public accountData: AccountDataService, public appData: AppDataService) {
    this.changes = new MutationObserver(() => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
    });

    this.appData.config$.subscribe(() => {
      this.navItems = null;
      setTimeout(() => {
        this.navItems = this.appData.navigation;
      });
    });
  }

  public onRouterOutletActivate(event: any) {
    if (event.kiwiContent) {
      this.aside = event.kiwiContent.aside;
      this.headerButtons = event.kiwiContent.headerButtons;
    }
  }

  ngAfterViewInit() {
    console.log(this.content);
  }

  logout() {
    this.accountData.logout().then(() => {
      window.location.reload();
    });
  }

}
