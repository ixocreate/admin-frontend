import {Config, Routes} from '../../kiwi/models';

export interface AppConfig extends Config {
    routes: AppRoutes;
}

export interface AppRoutes extends Routes {
    /**
     * Define your custom route config entries here
     */
    myResourceIndex: string;
    myResourceDetail: string;
    myResourceUpdate: string;
    myResourceCreate: string;
    myResourceDelete: string;
}
