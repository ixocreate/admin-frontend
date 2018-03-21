import {Config, Routes} from '../../kiwi/models';

export interface AppConfig extends Config{
    routes: AppRoutes;
}

export interface AppRoutes extends Routes {
    /**
     * application routes
     */
    myRoute: '',
}
