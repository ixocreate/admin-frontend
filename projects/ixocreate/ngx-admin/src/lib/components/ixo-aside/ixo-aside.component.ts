import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ixo-aside',
  templateUrl: './ixo-aside.component.html',
})
export class IxoAsideComponent implements OnInit, OnDestroy {

  @HostBinding('class.aside-menu') asideMenu = true;

  @Input() display = 'lg';

  @Input() set visible(visible: boolean) {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  private asideMenuCssClasses: string[] = [
    'aside-menu-show',
    'aside-menu-sm-show',
    'aside-menu-md-show',
    'aside-menu-lg-show',
    'aside-menu-xl-show',
  ];

  constructor() {
  }

  ngOnInit() {
    document.querySelector('body').classList.add('aside-menu-fixed');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('aside-menu-lg-show');
  }

  show() {
    if (this.display) {
      let cssClass;
      this.display ? cssClass = `aside-menu-${this.display}-show` : cssClass = this.asideMenuCssClasses[0];
      document.querySelector('body').classList.add(cssClass);
    }
  }

  hide() {
    if (this.display) {
      let cssClass;
      this.display ? cssClass = `aside-menu-${this.display}-show` : cssClass = this.asideMenuCssClasses[0];
      document.querySelector('body').classList.remove(cssClass);
    }
  }
}
