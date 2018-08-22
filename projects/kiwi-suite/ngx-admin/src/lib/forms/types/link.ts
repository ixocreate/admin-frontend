import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomFieldTypeAbstract } from './custom-field-type.abstract';

@Component({
  selector: 'formly-field-link',
  template: `
    <div class="input-group cursor-pointer" *ngIf="value" (click)="openModal(modalTemplate)">
      <div class="input-group-prepend">
        <span class="input-group-text">{{ value.type }}</span>
      </div>
      <input type="text" class="form-control pointer-events-none" [value]="valueString">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-input" (click)="remove()" kiwiClickStopPropagation>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
    <button *ngIf="!value" type="button" class="btn btn-block btn-outline-primary" [class.btn-outline-danger]="showError"
            (click)="openModal(modalTemplate)">
      Select a Link
    </button>

    <ng-template #modalTemplate>
      <div class="modal-header bg-primary">
        <h5 class="modal-title">Select a Link</h5>
      </div>
      <div class="modal-header d-block">
        <ng-select [items]="linkTypes" bindValue="name" [(ngModel)]="selectedType" [clearable]="false"></ng-select>
      </div>
      <ng-container *ngIf="selectedType === 'media'">
        <kiwi-media-list class="media-inline" (select)="onSelectType('media', $event)"></kiwi-media-list>
      </ng-container>
      <ng-container *ngIf="selectedType === 'sitemap'">
        <div class="modal-body">sitemap...</div>
      </ng-container>
      <ng-container *ngIf="selectedType === 'external'">
        <div class="modal-body">
          <input type="text" placeholder="Enter URL of external Link" class="form-control" [(ngModel)]="externalLinkInputValue">
        </div>
        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary" (click)="onSelectType('external', externalLinkInputValue);"><i class="fa fa-check"></i> Select</button>
        </div>
      </ng-container>
    </ng-template>
  `,
})
export class FormlyFieldLinkComponent extends CustomFieldTypeAbstract implements OnInit {

  externalLinkInputValue = '';

  modalRef: BsModalRef;
  selectedType = 'external';
  linkTypes = [
    {name: 'external', label: 'External'},
    {name: 'sitemap', label: 'Sitemap'},
    {name: 'media', label: 'Media'},
  ];

  constructor(protected modalService: BsModalService) {
    super();
  }

  get valueString() {
    return (this.value.value.filename || this.value.value.name || this.value.value);
  }

  openModal(template: TemplateRef<any>) {
    this.externalLinkInputValue = '';
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  onSelectType(type: string, value: any) {
    this.modalRef.hide();
    this.onSelect({type: type, value: value});
  }

}
