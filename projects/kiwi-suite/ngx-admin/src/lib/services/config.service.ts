import { Inject, Injectable, InjectionToken } from '@angular/core';
import { APIResponse } from './api.service';

export const KIWI_CONFIG = new InjectionToken<KiwiConfig>('KIWI_CONFIG');

export interface KiwiConfig {
  namespace?: string;
  configVariable?: string;
  environment?: EnvironmentConfig;
}

export interface EnvironmentConfig {
  production: boolean;
}

@Injectable()
export class ConfigService {

  private readonly _config: KiwiConfig = {
    namespace: '@kiwi',
    configVariable: '__kiwi',
    environment: {
      production: false,
    },
  };

  constructor(@Inject(KIWI_CONFIG) config: KiwiConfig) {
    this._config = Object.assign({}, this._config, config);
  }

  get config(): KiwiConfig {
    return this._config;
  }

  get namespace(): string {
    return this._config.namespace ? this._config.namespace + '/' : '';
  }

  get environment(): EnvironmentConfig {
    return this._config.environment;
  }

}
