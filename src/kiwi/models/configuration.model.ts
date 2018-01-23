export interface Config {
    apiUrl: string;
    configUrl: string;
    project: Project;
    navigation: Navigation[];
    routes: Routes;
}

export interface Navigation {
    path: string;
    icon: string;
    label: string;
}

export interface Project {
    author: string;
    copyright: string;
    name: string;
    poweredBy?: boolean;
    version: string;
}

export interface Routes {
    authLogin: string;
    authLogout: string;
    authUser: string;
    config: string;
}

