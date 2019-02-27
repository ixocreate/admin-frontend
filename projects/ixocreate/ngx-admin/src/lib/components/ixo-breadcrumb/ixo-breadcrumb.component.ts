import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Replace } from '../../shared/replace';
import { IxoBreadcrumbService } from './ixo-breadcrumb.service';

@Component({
  selector: 'ixo-breadcrumb',
  template: `
    <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs | async" let-last=last>
      <li class="breadcrumb-item" *ngIf="breadcrumb.label.title" [ngClass]="{active: last}">
        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
        <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
      </li>
    </ng-template>
  `,
})
export class IxoBreadcrumbComponent implements OnInit {
  @Input() fixed: boolean;
  public breadcrumbs;

  constructor(public service: IxoBreadcrumbService, public el: ElementRef) {
  }

  public ngOnInit(): void {
    Replace(this.el);
    this.isFixed(this.fixed);
    this.breadcrumbs = this.service.breadcrumbs;
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) {
      document.querySelector('body').classList.add('breadcrumb-fixed');
    }
  }
}
