import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  selector: 'formly-field-link',
  template: `
    <div class="input-group cursor-pointer" (click)="openModal(modalTemplate)">
      <div class="input-group-prepend">
        <span class="input-group-text" *ngIf="!value" [class.is-invalid]="showError"><i class="fa fa-fw fa-link"></i></span>
        <a [href]="valueLink" target="_blank" class="input-group-text" *ngIf="value" kiwiClickStopPropagation
           [class.is-invalid]="showError">
          <i class="fa fa-fw fa-link"></i>
        </a>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="valueString" [placeholder]="to.placeholder"
             [class.is-invalid]="showError">
      <div class="input-group-append">
        <span class="input-group-text d-none d-sm-block" *ngIf="value" [class.is-invalid]="showError">_blank</span>
        <span class="input-group-text" *ngIf="value" [class.is-invalid]="showError">{{ value.type }}</span>
        <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()"
                kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>

    <ng-template #modalTemplate>
      <div class="modal-header bg-primary">
        <h5 class="modal-title">Select a Link</h5>
      </div>
      <div class="modal-header d-block">
        <div class="row">
          <div class="col-sm-8">
            <ng-select [items]="linkTypes" bindValue="name" [(ngModel)]="selectedType" [clearable]="false"></ng-select>
          </div>
          <div class="col-sm">
            <ng-select [items]="targetTypes" bindValue="name" [(ngModel)]="selectedTarget" [clearable]="false"></ng-select>
          </div>
        </div>
      </div>
      <ng-container *ngIf="selectedType === 'media'">
        <kiwi-media-list class="media-inline" (select)="onSelectType($event)"></kiwi-media-list>
      </ng-container>
      <ng-container *ngIf="selectedType === 'sitemap'">
        <div class="modal-body">
          <div class="row align-items-center mb-3">
            <div class="col-sm"></div>
            <div class="col-sm-5 mt-2 mt-sm-0" *ngIf="locales.length > 1">
              <ng-select [items]="locales" bindLabel="name" bindValue="locale" [(ngModel)]="selectedLocale"
                         [clearable]="false" (change)="onChangeLocale()"></ng-select>
            </div>
          </div>
          <ng-select [items]="sitemap$ | async" [(ngModel)]="sitemapLinkInputValue" bindLabel="name" (change)="onSitemapLinkSelect()">
          </ng-select>
        </div>
      </ng-container>
      <ng-container *ngIf="selectedType === 'external'">
        <div class="modal-body">
          <input type="text" placeholder="Enter URL of external Link (http://...)" class="form-control"
                 [(ngModel)]="externalLinkInputValue">
        </div>
        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary" (click)="onSelectType(externalLinkInputValue);"><i
            class="fa fa-check"></i> Select
          </button>
        </div>
      </ng-container>
    </ng-template>
  `,
})
export class FormlyFieldLinkComponent extends CustomFieldTypeAbstract implements OnInit {

  sitemapLinkInputValue = '';
  externalLinkInputValue = '';

  modalRef: BsModalRef;
  selectedType = 'external';
  linkTypes = [
    {name: 'external', label: 'External'},
    {name: 'sitemap', label: 'Sitemap'},
    {name: 'media', label: 'Media'},
  ];

  selectedTarget = '_self';
  targetTypes = [
    {name: '_self', label: '_self (same window)'},
    {name: '_blank', label: '_blank (new window)'},
  ];

  selectedLocale: string;
  sitemap$: Promise<any>;

  constructor(protected modalService: BsModalService,
              private config: ConfigService,
              private appData: AppDataService,
              private localStorage: LocalStorageService) {
    super();
  }

  ngOnInit() {
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
    this.loadSitemap();
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  get valueString() {
    if (this.value == null) {
      return '';
    }
    return this.value.value.filename || this.value.value.name || this.value.value;
  }

  get valueLink() {
    if (this.value == null) {
      return '';
    }
    switch (this.value.type) {
      case 'external':
        return this.value.value;
      case 'sitemap':
        return this.value.link;
      case 'media':
        return this.value.link || this.value.value.original;
      default:
        return null;
    }
  }

  openModal(template: TemplateRef<any>) {
    if (this.value) {
      this.selectedType = this.value.type;
    }
    this.externalLinkInputValue = '';
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  onSelectType(value: any) {
    this.modalRef.hide();
    this.onSelect({type: this.selectedType, target: this.selectedTarget, value});
  }

  onSitemapLinkSelect() {
    this.onSelectType(this.sitemapLinkInputValue);
  }

  loadSitemap() {
    this.sitemapLinkInputValue = '';
    this.sitemap$ = this.appData.getSitemap(this.selectedLocale);
  }

  onChangeLocale() {
    this.loadSitemap();
  }
}
