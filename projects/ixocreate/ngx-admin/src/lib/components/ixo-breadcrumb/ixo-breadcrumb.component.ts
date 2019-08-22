import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { replace } from '../../shared/replace';
import { IxoBreadcrumbService } from './ixo-breadcrumb.service';

@Component({
  selector: 'ixo-breadcrumb',
  templateUrl: './ixo-breadcrumb.component.html'
})
export class IxoBreadcrumbComponent implements OnInit {
  @Input() fixed: boolean;

  public breadcrumbs;

  constructor(private service: IxoBreadcrumbService, private el: ElementRef) {
  }

  public ngOnInit() {
    replace(this.el);
    this.markFixed();
    this.breadcrumbs = this.service.breadcrumbs;
  }

  markFixed() {
    if (this.fixed) {
      document.querySelector('body').classList.add('breadcrumb-fixed');
    }
  }
}
