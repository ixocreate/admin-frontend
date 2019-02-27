import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Config, ResourceConfig } from '../interfaces/config.interface';
import { DefaultHelper } from '../helpers/default.helper';

export const IXO_CONFIG = new InjectionToken<IxoConfig>('IXO_CONFIG');

export interface IxoConfig {
  namespace?: string;
  configVariable?: string;
  environment?: EnvironmentConfig;
}

export interface EnvironmentConfig {
  production: boolean;
}

export interface UserLocaleConfig {
  dateFormat: string;
  dateTimeFormat: string;
  numberFormat: 'en' | 'de';
}

@Injectable()
export class ConfigService {

  private _config: Config;
  private _userPermissions: string[] = null;
  private _navigation: any = [];

  private readonly _ixoConfig: IxoConfig = {
    namespace: '@ixo',
    configVariable: '__ixo',
    environment: {
      production: false,
    },
  };

  constructor(@Inject(IXO_CONFIG) config: IxoConfig) {
    this._ixoConfig = Object.assign({}, this._ixoConfig, config);
  }

  setConfig(config: Config) {
    this._config = Object.assign({}, this.config, DefaultHelper.windowVar(this._ixoConfig.configVariable), config);
    this.parseNavigation();
  }

  get config(): Config {
    return this._config;
  }

  getResourceConfig(resourceName: string): ResourceConfig {
    for (const resourceConfig of this.config.resources) {
      if (resourceConfig.name === resourceName) {
        return resourceConfig;
      }
    }
    return null;
  }

  setUserPermissions(permissions: string[]) {
    this._userPermissions = permissions;
  }

  get userPermissions(): string[] {
    return this._userPermissions;
  }

  get userLocaleConfig(): UserLocaleConfig {
    return {
      // dateFormat: 'DD.MM.YYYY',
      // dateTimeFormat: 'DD.MM.YYYY HH:mm',
      dateFormat: 'YYYY-MM-DD',
      dateTimeFormat: 'YYYY-MM-DD HH:mm',
      numberFormat: 'en',
    };
  }

  get namespace(): string {
    return this._ixoConfig.namespace ? this._ixoConfig.namespace + '/' : '';
  }

  get environment(): EnvironmentConfig {
    return this._ixoConfig.environment;
  }

  get navigation() {
    return this._navigation;
  }

  private parseNavigation() {
    const navigation = [];

    if (this.config.navigation) {
      for (const group of this.config.navigation) {
        navigation.push({
          title: true,
          name: group.name,
        });
        for (const item of group.children) {
          if (item.children && item.children.length === 0) {
            delete item.children;
          }
          navigation.push(item);
        }
      }
    }

    this._navigation = navigation;
  }

}
