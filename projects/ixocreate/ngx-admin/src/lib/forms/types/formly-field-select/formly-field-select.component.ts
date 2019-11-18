import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { concat, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AppDataService } from '../../../services/data/app-data.service';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';

export interface SelectOption {
  label: string;
  value?: any;
  group?: SelectOption[];
}

/**
 * see https://github.com/ng-select/ng-select
 */

@Component({
  selector: 'formly-field-select',
  templateUrl: './formly-field-select.component.html'
})
export class FormlyFieldSelectComponent extends CustomFieldTypeAbstract implements OnInit, OnDestroy {

  @ViewChild('select') select;
  @ViewChild('modalTemplate') modal;

  addTagNowRef: (name) => void;
  modalRef: BsModalRef;

  selectedItem: { [key: string]: string } = {};

  options$: Observable<any[]>;
  optionsLoading = false;
  optionInput$ = new Subject<string>();

  public constructor(private appData: AppDataService, protected modalService: BsModalService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadOptions();
    if (this.createNew) {
      this.addTagNowRef = (name) => this.addTag(name);
    }
  }

  loadOptions() {
    /**
     * reset options observable after each type change
     */
    this.options$ = of(this.optionsFromTemplateOptions);

    /**
     * return here if there's nothing to load dynamically
     */
    if (!this.resourceKey) {
      return;
    }

    /**
     * params to send with the initial request but also with subsequent typeahead async requests
     */
    let params: { preselectFilter?: string, preselectFilterValues?: any, term?: string, locale?: string } = {};

    /**
     * add currently selected item values to request params to let the server know that it should
     * make sure to include those items.
     */
    if (this.value) {
      params.preselectFilter = this.valueProp;
      params.preselectFilterValues = this.value;
    }

    /**
     * initial data is fetched directly via promise
     */
    this.optionsLoading = true;
    this.appData.getResourceSelect(this.resourceKey, null, params)
      .then(data => {
        this.optionsLoading = false;

        /**
         * filter out selected items that are not present in the options list
         * makes deleted selected tags disappear
         * only do this the first time options are loaded
         * - otherwise we'd have to check whether new tags may or may not be created deferred or instantly
         */
        if (this.value && this.multiple) {
          const values = this.value.filter((value) => {
            return data.findIndex(option => option[this.valueProp] === value) >= 0;
          });
          this.setValue(values);
        }

        /**
         * set up the options$ observable for initial data as default items and
         * subsequent typeahead async calls
         * from: https://github.com/ng-select/ng-select/tree/master/src/demo/app/examples/search-autocomplete-example
         */
        this.options$ =
          concat(
            of(data), // default items
            this.optionInput$.pipe(
              debounceTime(500),
              distinctUntilChanged(),
              tap(() => this.optionsLoading = true),
              switchMap(
                term => {
                  /**
                   * add the typeahead search term to the request parameters
                   */
                  params = {...params};
                  params.preselectFilterValues = this.value;

                  return this.appData.getResourceSelect(this.resourceKey, term, params)
                    .then(data => {
                      this.optionsLoading = false;
                      return data;
                    })
                    .catch(() => {
                      this.optionsLoading = false;
                      // empty list on error
                      return [];
                    })
                }
              )
            )
          );
      })
      .catch(() => {
        this.optionsLoading = false;
      })
  }

  addTag(tag) {
    const newTag = {};
    newTag[this.valueProp] = tag;
    newTag[this.labelProp] = tag;

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

  onOpen() {
    if (this.to.extendedSelect) {
      this.select.close();
      this.openModal();
    }
  }

  onSelect(option) {
    if (this.multiple) {
      const values = option.map(value => {
        return value[this.valueProp];
      });
      this.setValue(values);
    } else {
      this.closeModal();
      this.setValue(option[this.valueProp]);
    }
  }

  onDeSelect(row) {
    this.setValue(this.value.filter((el) => el !== row.id));
  }

  get resourceKey() {
    if (this.to.resource) {
      return this.to.resource.resource;
    }
    return null;
  }

  get labelProp(): string {
    const defaultLabel = this.to.labelProp || 'label';
    return this.to.resource ? this.to.resource.label : defaultLabel;
  }

  get valueProp(): string {
    const defaultValue = this.to.valueProp || 'value';
    return this.to.resource ? this.to.resource.value : defaultValue;
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

  get optionsFromTemplateOptions() {
    const toOptions = this.to.options;
    const options: SelectOption[] = [];
    const groups: { [key: string]: SelectOption[] } = {};
    if (Array.isArray(toOptions)) {
      toOptions.map((option: SelectOption) => {
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
    return options;
  }
}
