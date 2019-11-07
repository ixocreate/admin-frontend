import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { concat, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MediaHelper } from '../../helpers/media.helper';
import { LinkType } from '../../interfaces/config.interface';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'ixo-link-select-modal',
  templateUrl: './ixo-link-select-modal.component.html',
})
export class IxoLinkSelectModalComponent implements OnInit {

  static TARGET_TYPES = [
    {name: '_self', label: 'Same window'},
    {name: '_blank', label: 'New window'},
  ];

  targetTypes = IxoLinkSelectModalComponent.TARGET_TYPES;

  linkTypes: LinkType[] = [];

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  value = null;
  innerValue = null;

  externalLinkInputValue = '';

  selectedType = 'external';
  selectedTarget = '_self';
  selectedLocale: string;

  options: { [key: string]: any[] } = {};
  selectedItem: { [key: string]: string } = {};

  options$: Observable<any[]>;
  optionsLoading = false;
  optionInput$ = new Subject<string>();

  onConfirm = (data: { type: string, target: string, value: any }) => {};

  constructor(public bsModalRef: BsModalRef,
              private config: ConfigService,
              private appData: AppDataService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.linkTypes = this.config.config.cms.linkTypes;
    this.innerValue = JSON.parse(JSON.stringify(this.value));
    if (this.innerValue && this.innerValue.type) {
      this.selectedType = this.innerValue.type;
    }
    if (this.selectedType === 'external' && this.innerValue) {
      this.externalLinkInputValue = this.innerValue.value;
    }
    if (this.innerValue && this.innerValue.target) {
      this.selectedTarget = this.innerValue.target;
    }
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
    if (this.innerValue && this.innerValue.value && this.innerValue.value.locale) {
      this.selectedLocale = this.innerValue.value.locale;
    }
    this.onTypeSelect();
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  confirm(data: any) {
    this.onConfirm(data);
    this.bsModalRef.hide();
  }

  onTypeSelect() {
    for (const linkType of this.linkTypes) {
      if (this.selectedType === linkType.type) {
        this.loadOptions(linkType);
      }
    }
  }

  onLinkTypeSelect(linkType: LinkType) {
    this.onSelectType(this.selectedItem[linkType.type]);
  }

  onSelectType(value: any) {
    this.confirm({type: this.selectedType, target: this.selectedTarget, value});
  }

  onChangeLocale(linkType: LinkType) {
    this.loadOptions(linkType);
    this.selectedItem[linkType.type] = '';
  }

  loadOptions(linkType: LinkType) {
    /**
     * reset options observable after each type change
     */
    this.options$ = of([]);

    /**
     * set the selected item right away
     * ng-select will show it as the selected one as soon as it received data
     */
    this.selectedItem[linkType.type] = null;
    if (this.innerValue && this.innerValue.value && this.innerValue.type == linkType.type) {
      this.selectedItem[linkType.type] = this.innerValue.value;
    }

    /**
     * if no listUrl is set we have to assume that there is no listing (external)
     * or the listing is handled differently (media)
     */
    if(!linkType.listUrl) {
      return;
    }

    /**
     * params to send with the initial request but also with subsequent typeahead async requests
     */
    let params: { id?: string, term?: string, locale?: string } = {};

    /**
     * add currently selected item id to request params to let the server know that it should
     * try to include that item. otherwise ng-select will assume that
     */
    params.id = this.innerValue.value.id;

    /**
     * add locale param if applicable
     */
    if (linkType.hasLocales) {
      const locale = linkType.hasLocales ? this.selectedLocale : null;
      if (locale) {
        params.locale = locale;
      }
    }

    /**
     * initial data is fetched directly via promise
     */
    this.optionsLoading = true;
    this.appData.getByUrl(linkType.listUrl, params)
      .then(data => {
        this.optionsLoading = false;

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
                  const asyncParams = {...params};
                  /**
                   * add the typeahead search term to the request parameters
                   */
                  if (term) {
                    asyncParams.term = term;
                  }
                  return this.appData.getByUrl(linkType.listUrl, asyncParams)
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
}
