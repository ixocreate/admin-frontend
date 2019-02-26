import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MediaHelper } from '../../helpers/media.helper';

export interface ConfigLinkType {
  type: string;
  label: string;
  hasLocales: boolean;
  url: string;
}

@Component({
  selector: 'kiwi-link-select-modal',
  templateUrl: './kiwi-link-select-modal.component.html',
})
export class KiwiLinkSelectModalComponent implements OnInit {

  static TARGET_TYPES = [
    {name: '_self', label: 'Same window'},
    {name: '_blank', label: 'New window'},
  ];

  targetTypes = KiwiLinkSelectModalComponent.TARGET_TYPES;

  linkTypes = [
    {name: 'external', label: 'External'},
    {name: 'media', label: 'Media'},
  ];
  configLinkTypes: ConfigLinkType[];

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  value = null;

  sitemapLinkInputValue = null;
  externalLinkInputValue = '';

  selectedType = 'external';

  selectedTarget = '_self';
  selectedLocale: string;
  sitemap: Array<{ id: string, name: string }>;

  selectItems: {[key: string]: any} = {};
  selectedItem: {[key: string]: string} = {};

  onConfirm = (data: { type: string, target: string, value: any }) => {
  };

  constructor(public bsModalRef: BsModalRef,
              private config: ConfigService,
              private appData: AppDataService,
              private localStorage: LocalStorageService) {

    this.configLinkTypes = [
      {type: 'sitemap', label: 'Sitemap', hasLocales: true, url: '/admin/api/page/list'},
    ];

    for (const configLinkType of this.configLinkTypes) {
      this.linkTypes.push({name: configLinkType.type, label: configLinkType.label});
    }
  }

  ngOnInit() {
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
    this.onTypeSelect();
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  confirm(data: any) {
    console.log(data);
    this.onConfirm(data);
    this.bsModalRef.hide();
  }

  onTypeSelect() {
    for (const configLinkType of this.configLinkTypes) {
      if (this.selectedType === configLinkType.type) {
        this.loadConfigLinkData(configLinkType);
      }
    }
  }

  onConfigTypeSelect(configType: ConfigLinkType) {
    this.onSelectType(this.selectedItem[configType.type]);
  }

  onChangeLocale(configType: ConfigLinkType) {
    this.loadConfigLinkData(configType, true);
    this.selectedItem[configType.type] = '';
  }

  loadConfigLinkData(configType: ConfigLinkType, force: boolean = false) {
    if (this.selectItems[configType.type] && !force) {
      return;
    }
    const locale = configType.hasLocales ? this.selectedLocale : null;
    this.appData.getByUrl(configType.url, locale).then((data) => {
      this.selectItems[configType.type] = data;
      this.setConfigTypeValue(configType);
    });
  }

  setConfigTypeValue(configType: ConfigLinkType) {
    if (this.value && this.selectItems[configType.type] && this.value.type === configType.type) {
      for (const element of this.selectItems[configType.type]) {
        if (element.id === this.value.value.id) {
          this.selectedItem[configType.type] = element;
        }
      }
    }
  }

  onSelectType(value: any) {
    this.confirm({type: this.selectedType, target: this.selectedTarget, value});
  }

}