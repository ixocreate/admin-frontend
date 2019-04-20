import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
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
  selector: 'ixo-link-select-modal',
  templateUrl: './ixo-link-select-modal.component.html',
})
export class IxoLinkSelectModalComponent implements OnInit {

  static TARGET_TYPES = [
    {name: '_self', label: 'Same window'},
    {name: '_blank', label: 'New window'},
  ];

  targetTypes = IxoLinkSelectModalComponent.TARGET_TYPES;

  linkTypes = [
    {name: 'external', label: 'External'},
    {name: 'media', label: 'Media'},
  ];
  configLinkTypes: ConfigLinkType[];

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  value = null;
  innerValue = null;

  externalLinkInputValue = '';

  selectedType = 'external';
  selectedTarget = '_self';
  selectedLocale: string;

  selectItems: { [key: string]: any } = {};
  selectedItem: { [key: string]: string } = {};

  onConfirm = (data: { type: string, target: string, value: any }) => {
  };

  constructor(public bsModalRef: BsModalRef,
              private config: ConfigService,
              private appData: AppDataService,
              private localStorage: LocalStorageService) {

    this.configLinkTypes = [
      {type: 'sitemap', label: 'Sitemap', hasLocales: true, url: '/admin/api/page/list'},
    ];

  }

  ngOnInit() {
    for (const configLinkType of this.configLinkTypes) {
      this.linkTypes.push({name: configLinkType.type, label: configLinkType.label});
    }
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
    if (this.innerValue && this.selectItems[configType.type] && this.innerValue.type === configType.type) {
      for (const element of this.selectItems[configType.type]) {
        if (element.id === this.innerValue.value.id) {
          this.selectedItem[configType.type] = element;
        }
      }
    }
  }

  onSelectType(value: any) {
    this.confirm({type: this.selectedType, target: this.selectedTarget, value});
  }

}
