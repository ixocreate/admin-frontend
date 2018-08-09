import { Inject, Injectable, InjectionToken } from '@angular/core';
import { APIResponse } from './api.service';

export const PACKAGE_CONFIG = new InjectionToken<PackageConfig>('PACKAGE_CONFIG');

export interface PackageConfig {
  namespace?: string;
  apiUrl?: string;
  apiTimeout?: number;
}

@Injectable()
export class ConfigService {

  private readonly _config: PackageConfig = {
    namespace: '@kiwi',
  };

  constructor(@Inject(PACKAGE_CONFIG) config: PackageConfig) {
    this._config = Object.assign({}, this._config, config);
  }

  get config(): PackageConfig {
    return this._config;
  }

  get namespace(): string {
    return this._config.namespace ? this._config.namespace + '/' : '';
  }

}
