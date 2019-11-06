import { Routes } from './routes.interface';

export interface Config {
  cms?: Cms;
  environment?: {
    production: boolean;
  };
  googleApiKey?: string;
  intl?: { default: string, locales: Locale[] };
  media?: Media[];
  navigation?: Navigation[];
  project?: Project;
  resources?: ResourceConfig[];
  routes?: Routes;
}

export interface Cms {
  preview: string;
  linkTypes: LinkType[];
}

export interface LinkType {
  type: string;
  label: string;
  hasLocales?: boolean;
  listUrl?: string;
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
  logo?: ProjectLogo;
  loginMessage?: string;
  logoutUrl?: string;
  loginUrl?: string;
}

export interface ProjectLogo {
  image: string;
  width: number;
  height: number;
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
