import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Config, ResourceConfig } from '../interfaces/config.interface';
import { DefaultHelper } from '../helpers/default.helper';

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

  private _config: Config;
  private _userPermissions: string[] = null;
  private _navigation: any = [];

  private readonly _kiwiConfig: KiwiConfig = {
    namespace: '@kiwi',
    configVariable: '__kiwi',
    environment: {
      production: false,
    },
  };

  constructor(@Inject(KIWI_CONFIG) config: KiwiConfig) {
    this._kiwiConfig = Object.assign({}, this._kiwiConfig, config);
  }

  setConfig(config: Config) {
    this._config = Object.assign({}, this.config, DefaultHelper.windowVar(this._kiwiConfig.configVariable), config);
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

  get namespace(): string {
    return this._kiwiConfig.namespace ? this._kiwiConfig.namespace + '/' : '';
  }

  get environment(): EnvironmentConfig {
    return this._kiwiConfig.environment;
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
