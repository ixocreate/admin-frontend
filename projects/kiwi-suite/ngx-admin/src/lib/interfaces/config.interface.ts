export interface Config {
  environment: {
    production: boolean;
  };
  project: Project;
  navigation: Navigation[];
  routes: any;
  intl: {default: string, locales: Locale[]};
}

export interface Project {
  author: string;
  copyright: string;
  name: string;
  poweredBy?: boolean;
  version: string;
}

export interface Navigation {
  icon?: string;
  name: string;
  url: string;
  permissions?: string[];
  roles?: string[];
  children: any;
}

export interface Locale {
  locale: string;
  name: string;
  active: boolean;
}
