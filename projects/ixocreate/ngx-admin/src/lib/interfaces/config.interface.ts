import { Routes } from './routes.interface';

export interface Config {
  environment?: {
    production: boolean;
  };
  project?: Project;
  media?: Array<Media>;
  navigation?: Array<Navigation>;
  routes?: Routes;
  resources?: Array<ResourceConfig>;
  googleApiKey?: string;
  intl?: { default: string, locales: Array<Locale> };
}

export interface Media {
  height: number;
  width: number;
  label: string;
  mode: string;
  name: string;
  upscale: boolean;
}

export interface Project {
  author?: string;
  copyright?: string;
  name?: string;
  poweredBy?: boolean;
  version?: string;
  background?: string;
  icon?: string;
  logo?: string;
  loginMessage?: string;
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

export interface ResourceConfig {
  name: string;
  label: string;
  listSchema: any;
  createSchema: any;
  updateSchema: any;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  additionalSchemas?: any;
}
