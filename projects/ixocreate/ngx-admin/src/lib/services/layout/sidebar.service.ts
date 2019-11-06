import { Injectable } from '@angular/core';

type Possibilities = 'OPEN' | 'CLOSED';

/**
 * Services that manipulates the right sidebar
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() {
  }

  /**
   * Get the current opening status of the sidebar
   */
  get status(): Possibilities {
    return document.body.classList.contains('aside-menu-lg-show') ? 'OPEN' : 'CLOSED';
  }

  /**
   * Get a fa icon based on the current status of the sidebar
   */
  get arrowIcon(): 'arrow-left' | 'arrow-right' {
    return this.status === 'OPEN' ? 'arrow-right' : 'arrow-left';
  }

  /**
   * Toggle sidebar and return it's state
   */
  toggleSidebar(): Possibilities {
    if (document.body.classList.contains('aside-menu-show')) {
      document.body.classList.remove('aside-menu-show');
      document.body.classList.add('aside-menu-hide');
      return this.status;
    } else {
      document.body.classList.remove('aside-menu-hide');
      document.body.classList.add('aside-menu-show');
      return this.status;
    }
  }
}
