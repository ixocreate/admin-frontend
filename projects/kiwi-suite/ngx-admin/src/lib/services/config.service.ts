import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Config } from '../interfaces/config.interface';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { DefaultHelper } from '../helpers/default.helper';
import { canActivateWithPermissions } from '../shared/userCanActivate';

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

  private _appConfig: Config = {
    project: {},
    navigation: [],
    routes: [],
  };

  private _userPermissions: Array<string> = null;

  private _navigation: any = [];

  private readonly _config: KiwiConfig = {
    namespace: '@kiwi',
    configVariable: '__kiwi',
    environment: {
      production: false,
    },
  };

  constructor(@Inject(KIWI_CONFIG) config: KiwiConfig, private store: Store<AppState>) {
    this._config = Object.assign({}, this._config, config);
  }

  setAppConfig(config: Config) {
    this._appConfig = Object.assign({}, this.appConfig, DefaultHelper.windowVar('__kiwi'), config);
    this.parseNavigation();
  }

  get appConfig(): Config {
    return this._appConfig;
  }

  setUserPermissions(permissions: Array<string>) {
    this._userPermissions = permissions;
    this.parseNavigation();
  }

  get userPermissions(): Array<string> {
    return this._userPermissions;
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

  get navigation() {
    return this._navigation;
  }

  private parseNavigation() {
    const navigation = [];

    if (this.appConfig.navigation && this.userPermissions) {
      for (const group of this.appConfig.navigation) {
        navigation.push({
          title: true,
          name: group.name,
        });

        let hasChild = false;
        for (const item of group.children) {
          if (item.children && item.children.length === 0) {
            delete item.children;
          }
          if (canActivateWithPermissions(this.userPermissions, item.permissions)) {
            hasChild = true;
            navigation.push(item);
          }
        }
        if (!hasChild) {
          navigation.pop();
        }
      }
    }

    console.log(navigation);

    this._navigation = navigation;
  }

}
