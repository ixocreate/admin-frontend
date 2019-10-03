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

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _user: User = null;
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

  private _config: Config;

  get config(): Config {
    return this._config;
  }

  private _userPermissions: string[] = null;

  get userPermissions(): string[] {
    return this._userPermissions;
  }

  private _navigation: any = [];

  get navigation() {
    return this._navigation;
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
    return this._user ? this._user.locale || 'en-US' : 'en-US';
  }

  get numberLocale(): string {
    return this._user ? this._user.numberLocale || this.locale : this.locale;
  }

  get dateLocale(): string {
    return this._user ? this._user.dateLocale || this.locale : this.locale;
  }

  get timezone(): string {
    return this._user ? this._user.timezone || 'UTC' : 'UTC';
  }

  get namespace(): string {
    return this._ixoConfig.namespace ? this._ixoConfig.namespace + '/' : '';
  }

  get environment(): EnvironmentConfig {
    return this._ixoConfig.environment;
  }

  setConfig(config: Config) {
    this._config = Object.assign({}, this.config, DefaultHelper.windowVar(this._ixoConfig.configVariable), config);
    this.parseNavigation();
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
