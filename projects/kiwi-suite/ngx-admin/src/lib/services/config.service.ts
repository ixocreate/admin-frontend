import { Inject, Injectable, InjectionToken } from '@angular/core';
import { APIResponse } from './api.service';

export const PACKAGE_CONFIG = new InjectionToken<PackageConfig>('PACKAGE_CONFIG');

export interface PackageConfig {
  namespace?: string;
  environment?: EnvironmentConfig;
  apiUrl?: string;
  apiTimeout?: number;
}

export interface EnvironmentConfig {
  production: boolean;
}

@Injectable()
export class ConfigService {

  private readonly _config: PackageConfig = {
    namespace: '@kiwi',
    environment: {
      production: false,
    },
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

  get environment(): EnvironmentConfig {
    return this._config.environment;
  }

}
