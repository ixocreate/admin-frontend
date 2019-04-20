import { Routes } from './routes.interface';

export interface Config {
  environment?: {
    production: boolean;
  };
  project?: Project;
  media?: Media[];
  navigation?: Navigation[];
  routes?: Routes;
  resources?: ResourceConfig[];
  googleApiKey?: string;
  intl?: { default: string, locales: Locale[] };
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
