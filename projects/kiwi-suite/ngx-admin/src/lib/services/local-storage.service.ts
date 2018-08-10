import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class LocalStorageService {

  constructor(protected config: ConfigService) {
  }

  setItem(key: string, value: any) {
    localStorage.setItem(this.config.namespace + key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(this.config.namespace + key));
  }

  removeItem(key: string) {
    localStorage.removeItem(this.config.namespace + key);
  }

}
