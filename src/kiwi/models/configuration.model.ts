export class Config {
    apiUrl = '/api/';
    authPath = 'auth';
    configPath = 'config';
    project: ProjectConfig = <ProjectConfig>{};
}

export interface ProjectConfig {
    copyright: string;
    name: string;
    poweredBy?: boolean;
    version: string;
}
