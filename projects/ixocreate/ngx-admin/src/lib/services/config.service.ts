import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Config, ResourceConfig } from '../interfaces/config.interface';
import { DefaultHelper } from '../helpers/default.helper';
import { User } from '../interfaces/user.interface';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

export const IXO_CONFIG = new InjectionToken<IxoConfig>('IXO_CONFIG');

export interface IxoConfig {
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
  private _user: User = null;
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

  setUser(user: User) {
    this._user = user;
  }

  setUserPermissions(permissions: string[]) {
    this._userPermissions = permissions;
  }

  get userPermissions(): string[] {
    return this._userPermissions;
  }

  get dateFormat(): string {
    // from https://stackoverflow.com/a/49852591/580651
    return moment().locale(this.dateLocale).creationData().locale.longDateFormat('L');
  }

  get dateTimeFormat(): string {
    // from https://stackoverflow.com/a/49852591/580651
    return moment().locale(this.dateLocale).creationData().locale.longDateFormat('LLL');
  }

  get timeFormat(): string {
    // from https://stackoverflow.com/a/49852591/580651
    return moment().locale(this.dateLocale).creationData().locale.longDateFormat('LT');
  }

  get language(): string {
    return this.locale;
  }

  get locale(): string {
    return this._user.locale || 'en-US';
  }

  get numberLocale(): string {
    return this._user.numberLocale || this.locale;
  }

  get dateLocale(): string {
    return this._user.dateLocale || this.locale;
  }

  get timezone(): string {
    return this._user.timezone || 'UTC';
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
