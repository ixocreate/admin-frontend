import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AppDataService} from '../../services/data/app-data.service';
import {CustomFieldTypeAbstract} from './custom-field-type.abstract';

export interface SelectOption {
  label: string;
  value?: any;
  group?: SelectOption[];
}

/**
 * see https://github.com/ng-select/ng-select
 *
 * TODO: add more ng-select options
 */

@Component({
  selector: 'formly-field-select',
  template: `
    <ng-container *ngIf="selectOptions">
      <div class="input-group">
        <ng-select
          #select
          (open)="onOpen()"
          (search)="onOpen()"
          (change)="onSelect($event)"
          [class.is-invalid]="showError"
          [items]="selectOptions"
          [placeholder]="to.placeholder"
          [searchable]="!to.extendedSelect"
          [bindValue]="valueProp"
          [bindLabel]="labelProp"
          [virtualScroll]="true"
          [addTag]="addTagNowRef"
          [clearable]="false"
          [multiple]="multiple"
          [formControl]="formControl">
        </ng-select>
        <div class="input-group-append" *ngIf="clearable">
          <button type="button" class="btn" [class.btn-outline-input]="!showError" [class.btn-outline-danger]="showError" (click)="remove()">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </div>
      <ng-template #modalTemplate>
        <ixo-datatable [resource]="resourceKey" [advancedSearch]="true" type="select" [selectedElements]="multiple ? value : []"
                       (select)="onSelect($event)" (deSelect)="onDeSelect($event)"></ixo-datatable>
        <div class="bg-white text-center p-2" *ngIf="multiple">
          <button class="btn btn-primary" (click)="closeModal()">Close</button>
        </div>
      </ng-template>
    </ng-container>
  `,
})
export class FormlyFieldSelectComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  @ViewChild('select') select;
  @ViewChild('modalTemplate') modal;

  addTagNowRef: (name) => void;
  selectOptions: any;
  modalRef: BsModalRef;

  public constructor(private appData: AppDataService, protected modalService: BsModalService) {
    super();
  }

  get resourceKey() {
    if (this.to.resource) {
      return this.to.resource.resource;
    }
    return null;
  }

  openModal() {
    if (this.to.disabled) {
      return;
    }
    this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-empty'});
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
  }

  ngOnInit() {
    super.ngOnInit();

    /**
     * TODO: move this to some load() method so it can be reloaded after non-deferred entry creation
     */
    if (this.resourceKey) {
      this.appData.getResourceSelect(this.resourceKey).then((options) => {
        this.selectOptions = options;
      });
    } else {
      const options: SelectOption[] = [];
      const groups: { [key: string]: SelectOption[] } = {};
      if (Array.isArray(this.to.options)) {
        this.to.options.map((option: SelectOption) => {
          if (!option[this.groupProp]) {
            options.push(option);
          } else {
            if (groups[option[this.groupProp]]) {
              groups[option[this.groupProp]].push(option);
            } else {
              groups[option[this.groupProp]] = [option];
              options.push({
                label: option[this.groupProp],
                group: groups[option[this.groupProp]],
              });
            }
          }
        });
      }
      this.selectOptions = options;
    }

    if (this.createNew) {
      this.addTagNowRef = (name) => this.addTag(name);
    }
  }

  onOpen() {
    if (this.to.extendedSelect) {
      this.select.close();
      this.openModal();
    }
  }

  addTag(tag) {
    const newTag = {};
    newTag[this.valueProp] = tag;
    /**
     * createNewDeferred: server will take care of new entry creation
     * note: this only works if the tag text instead of the uuid is stored/transmitted
     * TODO: find a way to send both, uuids as well as new tags' text, to the server
     */
    if (!this.createNewDeferred) {
      // TODO: create new entry on the fly
    }
    return newTag;
  }

  get labelProp(): string {
    const defaultLabel = this.to.labelProp || 'label';
    return (this.to.resource) ? this.to.resource.label : defaultLabel;
  }

  get valueProp(): string {
    const defaultValue = this.to.valueProp || 'value';
    return (this.to.resource) ? this.to.resource.value : defaultValue;
  }

  get groupProp(): string {
    return this.to.groupProp || 'group';
  }

  get clearable() {
    return this.to.clearable && !this.to.disabled;
  }

  get multiple() {
    return this.to.multiple || false;
  }

  get createNew() {
    return this.to.createNew || false;
  }

  get createNewDeferred() {
    return this.to.createNewDeferred || false;
  }

  onSelect(row) {
    if (this.multiple) {
      const values = row.map((value) => {
        return value[this.valueProp];
      });
      this.setValue(values);
    } else {
      this.closeModal();
      this.setValue(row[this.valueProp]);
    }
  }

  onDeSelect(row) {
    this.setValue(this.value.filter((el) => el !== row.id));
  }
}
