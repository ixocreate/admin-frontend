import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ConfigService } from '../../services/config.service';
import { AppDataService } from '../../services/data/app-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MediaHelper } from '../../helpers/media.helper';

@Component({
  selector: 'kiwi-link-select-modal',
  templateUrl: './kiwi-link-select-modal.component.html',
})
export class KiwiLinkSelectModalComponent implements OnInit {

  static TARGET_TYPES = [
    {name: '_self', label: 'Same window'},
    {name: '_blank', label: 'New window'},
  ];

  static LINK_TYPES = [
    {name: 'external', label: 'External'},
    {name: 'sitemap', label: 'Sitemap'},
    {name: 'media', label: 'Media'},
  ];

  targetTypes = KiwiLinkSelectModalComponent.TARGET_TYPES;
  linkTypes = KiwiLinkSelectModalComponent.LINK_TYPES;

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  value = null;

  sitemapLinkInputValue = null;
  externalLinkInputValue = '';

  selectedType = 'external';

  selectedTarget = '_self';
  selectedLocale: string;
  sitemap: Array<{ id: string, name: string }>;

  onConfirm = (data: { type: string, target: string, value: any }) => {
  };

  constructor(public bsModalRef: BsModalRef,
              private config: ConfigService,
              private appData: AppDataService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
    this.loadSitemap();
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  confirm(data: any) {
    this.onConfirm(data);
    this.bsModalRef.hide();
  }

  onSelectType(value: any) {
    this.confirm({type: this.selectedType, target: this.selectedTarget, value});
  }

  onSitemapLinkSelect() {
    this.onSelectType(this.sitemapLinkInputValue);
  }

  setSiteMapValue() {
    if (this.sitemap && this.value && this.value.type === 'sitemap') {
      for (const element of this.sitemap) {
        if (element.id === this.value.value.id) {
          this.sitemapLinkInputValue = element;
        }
      }
    }
  }

  loadSitemap() {
    this.appData.getSitemap(this.selectedLocale).then((data) => {
      this.sitemap = data;
      this.setSiteMapValue();
    });
  }

  onChangeLocale() {
    this.loadSitemap();
  }

}
