import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'kiwi-aside',
  templateUrl: './kiwi-aside.component.html',
})
export class KiwiAsideComponent implements OnInit, OnDestroy {

  @HostBinding('class.aside-menu') asideMenu = true;

  @Input() display: any = 'lg';

  private asideMenuCssClasses: Array<string> = [
    'aside-menu-show',
    'aside-menu-sm-show',
    'aside-menu-md-show',
    'aside-menu-lg-show',
    'aside-menu-xl-show'
  ];

  constructor() {
  }

  ngOnInit() {
    this.displayBreakpoint(this.display);
    document.querySelector('body').classList.add('aside-menu-fixed');
    document.querySelector('body').classList.add('aside-menu-lg-show');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('aside-menu-lg-show');
  }

  displayBreakpoint(display: any): void {
    if (this.display !== false ) {
      let cssClass;
      this.display ? cssClass = `aside-menu-${this.display}-show` : cssClass = this.asideMenuCssClasses[0];
      document.querySelector('body').classList.add(cssClass);
    }
  }
}
