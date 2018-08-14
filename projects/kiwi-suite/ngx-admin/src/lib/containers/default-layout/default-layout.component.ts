import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { AppDataService } from '../../services/data/app-data.service';
import { KiwiContentComponent } from '../../components/kiwi-content/kiwi-content.component';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements AfterViewInit {

  @ViewChild('header') header: ElementRef;

  navItems = null;
  sidebarMinimized = true;
  private changes: MutationObserver;
  element: HTMLElement = document.body;

  aside: TemplateRef<any>;
  headerButtons: TemplateRef<any>;
  kiwiContent: KiwiContentComponent;

  paddingTop = 26;

  @HostListener('window:resize') onResize() {
    this.setHeaderHeight();
  }

  constructor(public accountData: AccountDataService, public config: ConfigService) {
    this.changes = new MutationObserver(() => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
    });

    this.navItems = this.config.navigation;
  }

  onRouterOutletActivate(event: any) {
    this.kiwiContent = event.kiwiContent;
    if (event.kiwiContent) {
      this.aside = event.kiwiContent.aside;
      this.headerButtons = event.kiwiContent.headerButtons;
      this.setHeaderHeight();
    }
  }

  ngAfterViewInit() {
    this.setHeaderHeight();
  }

  setHeaderHeight() {
    if (this.kiwiContent) {
      setTimeout(() => {
        this.kiwiContent.headerHeight = this.header.nativeElement.clientHeight + this.paddingTop;
      });
    }
  }

  logout() {
    this.accountData.logout().then(() => {
      window.location.reload();
    });
  }

}
