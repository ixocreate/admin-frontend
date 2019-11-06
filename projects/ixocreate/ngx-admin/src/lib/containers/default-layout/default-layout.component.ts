import { AfterViewInit, Component, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { AccountDataService } from '../../services/data/account-data.service';
import { IxoContentComponent } from '../../components/ixo-content/ixo-content.component';
import { ConfigService } from '../../services/config.service';
import { ImageHelper } from '../../helpers/image.helper';
import { Observable } from 'rxjs';

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
  ixoContent: IxoContentComponent;
  lightBoxImage$: Observable<string>;

  paddingTop = 26;

  @HostListener('window:resize') onResize() {
    this.setHeaderHeight();
  }

  constructor(public accountData: AccountDataService, public config: ConfigService) {
    this.changes = new MutationObserver(() => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(this.element as Element, {
      attributes: true,
    });

    this.lightBoxImage$ = ImageHelper.getImage();

    this.navItems = this.config.navigation;
  }

  onRouterOutletActivate(event: any) {
    this.ixoContent = event.ixoContent;
    if (event.ixoContent) {
      this.aside = event.ixoContent.aside;
      this.headerButtons = event.ixoContent.headerButtons;
      this.setHeaderHeight();
    }
  }

  closeLightboxImage() {
    ImageHelper.setImage(null);
  }

  ngAfterViewInit() {
    this.setHeaderHeight();
  }

  setHeaderHeight() {
    if (this.ixoContent) {
      setTimeout(() => {
        this.ixoContent.headerHeight = this.header.nativeElement.clientHeight + this.paddingTop;
      });
    }
  }

  logout() {
    window.location.href = this.config.config.project.logoutUrl;
  }

}
