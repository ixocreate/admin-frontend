import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static readonly SELECTED_LANGUAGE = 'selectedLanguage';

  constructor(protected config: ConfigService) {
  }

  setItem(key: string, value: any) {
    localStorage.setItem(this.config.namespace + key, JSON.stringify(value));
  }

  getItem(key: string, defaultValue: any = null): any {
    if (localStorage.getItem(this.config.namespace + key)) {
      return JSON.parse(localStorage.getItem(this.config.namespace + key));
    }
    return defaultValue;
  }

  removeItem(key: string) {
    localStorage.removeItem(this.config.namespace + key);
  }

}
