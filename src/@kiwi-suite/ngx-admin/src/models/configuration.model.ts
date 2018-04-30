export interface Config {
    environment: {
        production: boolean;
    };
    project: Project;
    navigation: Navigation[];
    routes: Routes;
}

export interface Navigation {
    icon?: string;
    name: string;
    url: string;
    permissions?: string[];
    roles?: string[];
}

export interface Project {
    author: string;
    copyright: string;
    name: string;
    poweredBy?: boolean;
    version: string;
}

export interface Routes {
    /**
     * config & session
     */
    config: string;
    session: string;
    /**
     * account (auth user context)
     */
    accountAvatar: string;
    accountEmail: string;
    accountPassword: string;
    /**
     * auth
     */
    authLogin: string;
    authLogout: string;
    authUser: string;
    /**
     * media
     */
    mediaUpload: string;
    /**
     * password
     */
    passwordEmail: string;
    passwordReset: string;
    /**
     * users crud
     */
    userIndex: string;
    userDetail: string;
    userUpdate: string;
    userCreate: string;
    userDelete: string;
    userEmail: string;
}
